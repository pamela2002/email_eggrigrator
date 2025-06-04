const axios = require('axios');

const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';
const EXTERNAL_WEBHOOK_URL = 'https://webhook.site/a314855d-4207-4567-93e7-e503f3616efc';

async function sendSlackNotification(emailData) {
    try {
        const message = `📨 *Interested Email Received!*\n*Subject:* ${emailData.subject}\n*From:* ${emailData.from}\n*Date:* ${emailData.date}`;
        console.log("🔁 Sending Slack notification...");
        const slackResponse = await axios.post(
            SLACK_WEBHOOK_URL,
            { text: message },
            { timeout: 5000 }
        );
        console.log("✅ Slack sent:", slackResponse.status);
    } catch (err) {
        console.error("❌ Slack Error:", err.message);
    }
}

// 🔁 Trigger webhook for automation
async function triggerExternalWebhook(emailData) {
    try {
        console.log("🔁 Sending external webhook...");
        const webhookResponse = await axios.post(
            EXTERNAL_WEBHOOK_URL,
            emailData,
            { timeout: 5000 }
        );
        console.log("✅ Webhook sent:", webhookResponse.status);
    } catch (err) {
        console.error("❌ Webhook Error:", err.message);
    }
}

module.exports = { sendSlackNotification, triggerExternalWebhook };