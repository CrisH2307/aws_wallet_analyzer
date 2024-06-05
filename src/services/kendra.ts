import AWS from 'aws-sdk'

const kendra = new AWS.Kendra({
    apiVersion: '2019-02-03',
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY!,
    }
});

export const queryKendra = async(queryText : string) => {
    const params = {
        IndexId: process.env.REACT_APP_KENDRA_INDEX_ID!,
        QueryText: queryText,
    }
    
    try {
        const response = await kendra.query(params).promise();
        return response;
    } catch(err) {
        console.error('Error querying Kendra:', err);
        throw err;
    }
}