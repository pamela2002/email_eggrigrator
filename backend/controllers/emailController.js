const { fetchEmails } = require("../services/imapService");
const { indexEmails, searchEmails } = require("../services/elasticsearchService");

exports.syncEmails = async (req, res) => {
    const { email, password, host, port, accountId, folder = "INBOX" } = req.body;

    try {
        const emails = await fetchEmails({ email, password, host, port, folder });

        await indexEmails(emails, accountId, folder);

        res.status(200).json({ message: "Emails synced and indexed successfully", count: emails.length });
    } catch (error) {
        console.error("Failed to sync emails:", error);
        res.status(500).json({ message: "Failed to sync email", error: error.message });
    }
};

exports.searchEmails = async (req, res) => {
    const { query, accountId, folder } = req.query;

    try {
        const results = await searchEmails(query, accountId, folder);
        res.status(200).json(results);
    } catch (error) {
        console.error("Search failed:", error);
        res.status(500).json({ message: "Search failed", error: error.message });
    }
};
