// backend/services/elasticsearchService.js
const { Client } = require('@elastic/elasticsearch');

// Replace these values with your actual Elastic Cloud credentials
const client = new Client({
    cloud: {
        id: process.env.ELASTIC_CLOUD_ID,
    },
    auth: {
        username: process.env.ELASTIC_USERNAME,
        password: process.env.ELASTIC_PASSWORD,
    },
});

const INDEX_NAME = 'emails';

const indexEmails = async (emails, folder, account) => {
    if (!emails?.length) return;

    const body = emails.flatMap((email) => [
        { index: { _index: "emails" } },
        {
            from: email.from || "",
            subject: email.subject || "",
            text: email.text || "",
            date: email.date || new Date().toISOString(),
            folder: folder || "INBOX",
            account: account || "unknown",
        },
    ]);

    const result = await client.bulk({ refresh: true, body });

    if (result.errors) {
        const errorDetails = result.items.filter((item) => item.index?.error);
        console.error("Some emails failed to index:", errorDetails);
    }

    return result;
  };

async function searchEmails({ query, folder, account }) {
    const must = [];

    if (query) {
        must.push({
            multi_match: {
                query,
                fields: ['from', 'subject', 'text'],
            },
        });
    }

    if (folder) {
        must.push({ match: { folder } });
    }

    if (account) {
        must.push({ match: { account } });
    }

    const { hits } = await client.search({
        index: INDEX_NAME,
        query: {
            bool: {
                must,
            },
        },
    });

    return hits.hits.map((hit) => hit._source);
}

module.exports = {
    indexEmails,
    searchEmails,
    elasticClient: client,
};
