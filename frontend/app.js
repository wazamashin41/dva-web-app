// 1. 画像用バケットの公開URLに書き換えてください
const IMAGE_URL = 'https://dva-content-s3-bucket.s3.ap-northeast-1.amazonaws.com/test-image.jpg';

// 2. Fetch APIを使って画像を読み込む（これがCORSの検証になります）
fetch(IMAGE_URL)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTPエラー! ステータス: ${response.status}`);
        }
        return response.blob(); // 画像データをバイナリとして取得
    })
    .then(blob => {
        // 取得したバイナリデータをブラウザで表示できるURLに変換
        const objectURL = URL.createObjectURL(blob);
        const img = document.createElement('img');
        img.src = objectURL;
        img.style.maxWidth = '400px';
        img.style.border = '2px solid #333';
        
        document.getElementById('image-container').appendChild(img);
    })
    .catch(err => {
        // エラーが出た場合、CORS設定が原因であることが多いです
        console.error('読み込み失敗:', err);
        document.getElementById('image-container').innerHTML = 
            `<p style="color:red;">エラー発生: ${err.message}<br>
            S3のCORS設定を確認してください。</p>`;
    });