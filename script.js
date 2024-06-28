let btn = document.querySelector('#generate');
let canvas = document.getElementById('qrcodeCanvas');
let ctx = canvas.getContext('2d');
let downloadBtn = document.querySelector('#download');

btn.addEventListener('click', async (e) => {
    e.preventDefault();

    let text = document.getElementById('text').value;

    if (text === '') {
        alert('Enter a URL, mate!');
    } else {
        let qrSize = 1000;
        let borderSize = 10;
        // Set canvas size to include the border
        canvas.width = qrSize + borderSize * 2;
        canvas.height = qrSize + borderSize * 2;

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Fetch the QR code image
        let qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(text)}`;
        let response = await fetch(qrUrl);
        let blob = await response.blob();
        let blobUrl = URL.createObjectURL(blob);
        let qrImage = new Image();

        qrImage.onload = () => {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(qrImage, borderSize, borderSize, qrSize, qrSize);
        };

        qrImage.src = blobUrl;
    }
});

downloadBtn.addEventListener('click', () => {
    let dataUrl = canvas.toDataURL('image/png');
    let fileName = prompt('Enter the filename to download (without extension):', 'qrcode');

    if (fileName) {
        let downloadLink = document.createElement('a');
        downloadLink.href = dataUrl;
        downloadLink.download = `${fileName}.png`;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    } else {
        alert('Filename cannot be empty. Please try again.');
    }
});
