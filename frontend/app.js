// 注意: DVA試験では SDK v3 (モジュール形式) が主流です
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

async function loadImage() {
    // 1. Identity Pool から一時的な認証情報を取得
    const credentials = fromCognitoIdentityPool({
        identityPoolId: "ap-northeast-1_HouGGirCX", // あなたのID
        clientConfig: { region: "ap-northeast-1" }
    });

    const s3Client = new S3Client({ region: "ap-northeast-1", credentials });

    // 2. S3 から画像を取得
    const command = new GetObjectCommand({
        Bucket: "dva-content-s3-bucket",
        Key: "test.jpg"
    });

    try {
        const response = await s3Client.send(command);
        // 画像を表示する処理...
    } catch (err) {
        console.error("CORSや権限エラーならここで捕まる！", err);
    }
}