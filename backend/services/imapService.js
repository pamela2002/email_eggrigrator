const imaps = require("imap-simple");
const { simpleParser } = require("mailparser");
const esClient = require("./elasticsearchClient");
const { categorizeEmailBatch } = require("./aiCategorizerService");

async function fetchEmails({ email, password, host, port, folder = "INBOX" }) {
    const config = {
        imap: {
            user: email,
            password,
            host,
            port: parseInt(port),
            tls: true,
            tlsOptions: {
                rejectUnauthorized: false,
            },
            authTimeout: 5000,
        },
        onError: (err) => console.error("IMAP error:", err),
    };

    const connection = await imaps.connect(config);
    await connection.openBox(folder);

    // ⏳ Fetch emails since last 30 days
    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - 30);
    const searchCriteria = [["SINCE", sinceDate.toDateString()]];

    const fetchOptions = {
        bodies: ["HEADER", "TEXT"],
        markSeen: false,
    };

    const messages = await connection.search(searchCriteria, fetchOptions);

    const emails = [];
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const BATCH_LIMIT = 10;

    for (let i = 0; i < Math.min(messages.length, BATCH_LIMIT); i++) {
        const item = messages[i];
        const all = item.parts.find((part) => part.which === "TEXT");
        const parsed = await simpleParser(all.body);

        const mailData = {
            from: parsed.from?.text,
            to: parsed.to?.text,
            subject: parsed.subject,
            date: parsed.date,
            text: parsed.text,
            html: parsed.html || "",
            folder,
            account: email,
        };

        try {
            const category = await categorizeEmailBatch(mailData);
            mailData.category = category;
        } catch (err) {
            console.error("Gemini classification error:", err);
            mailData.category = "Uncategorized";
        }

        emails.push(mailData);

        try {
            await esClient.index({
                index: "emails",
                body: mailData,
            });
        } catch (err) {
            console.error("Elasticsearch Index Error:", err.message);
        }

        // ⏳ Wait to respect Gemini free-tier limits (12 req/min ≈ 5s delay)
        await delay(5000);
    }

    return emails;
}

module.exports = { fetchEmails };
