// services/elasticsearchClient.js
const { Client } = require('@elastic/elasticsearch');

const client = new Client({
    node: 'https://70a22702d46c48d9ad0efedcd6461fb5.us-central1.gcp.cloud.es.io:443',  
    auth: {
        username: process.env.ELASTIC_USERNAME,
        password: process.env.ELASTIC_PASSWORD                    
    }
});

module.exports = client;
