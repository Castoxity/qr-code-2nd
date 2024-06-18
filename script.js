let btn = document.querySelector('#generate');
let qrcode = document.querySelector('.qrcode');
let downloadBtn = document.querySelector('#download');

btn.addEventListener('click', async (e) => {
    e.preventDefault();

    let text = document.getElementById('text').value;

    if (text === '') {
        alert('Enter a URL, mate!');
    } else {
        let bgColor = 'rgba(0, 0, 0, 0)'; 
        let qr = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(text)}&bgcolor=${bgColor}`;
        console.log('QR Code URL:', qr); 
        qrcode.src = qr;
        qrcode.dataset.downloadUrl = qr;

        let response = await fetch(qr);
        let blob = await response.blob();
        let blobUrl = URL.createObjectURL(blob);
        qrcode.dataset.blobUrl = blobUrl; 
        qrcode.style.display = 'block';
    }
});

downloadBtn.addEventListener('click', () => {
    let blobUrl = qrcode.dataset.blobUrl;

    if (blobUrl) {
        let fileName = prompt('Enter the filename to download (without extension):', 'qrcode');

        if (fileName) {
            let qrImage = new Image();
            qrImage.src = blobUrl;

            qrImage.onload = () => {
                let tempCanvas = document.createElement('canvas');
                let tempCtx = tempCanvas.getContext('2d');
                let borderSize = 5;
                let size = 250;

                tempCanvas.width = size + borderSize * 2;
                tempCanvas.height = size + borderSize * 2;

                tempCtx.fillStyle = 'white';
                tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
                tempCtx.drawImage(qrImage, borderSize, borderSize, size, size);

                let dataUrl = tempCanvas.toDataURL('image/png');
                let downloadLink = document.createElement('a');
                downloadLink.href = dataUrl;
                downloadLink.download = `${fileName}.png`;

                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            };
        } else {
            alert('Filename cannot be empty. Please try again.');
        }
    } else {
        alert('Generate a QR code first before downloading.');
    }
});