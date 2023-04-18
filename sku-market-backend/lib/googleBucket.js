const { Storage } = require("@google-cloud/storage");
 
// Google Bucket Configuration ---------------
const storage = new Storage({
    keyFilename: "./config/google_bucket_key.json",
});
const bucketName = "sku_market_chat";
const bucket = storage.bucket(bucketName);

// Upload file to bucket
const bucketUpload = async(filePath, destination) => {
	const data = await bucket.upload(filePath, {
        gzip: true,
        destination,
        metadata: {
            cacheControl: "public, max-age=31536000",
        },
    });
    console.log(data);
    return {url: `https://storage.googleapis.com/${bucketName}/${data[0].name}`};
}

module.exports = { bucket, bucketName, bucketUpload };