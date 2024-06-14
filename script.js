document.addEventListener('DOMContentLoaded', () => {
    let generateBtn = document.querySelector('#generate');
    let downloadBtn = document.querySelector('#download');
    let qrcodeContainer = document.querySelector('#qrcode');

    generateBtn.addEventListener('click', () => {
        let text = document.getElementById('text').value.trim();

        if (text === '') {
            alert('Enter a URL to generate QR code.');
        } else {
            qrcodeContainer.innerHTML = '';

            new QRCode(qrcodeContainer, {
                text: text,
                width: 250,
                height: 250,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });

            // qrcodeContainer.style.border = '5px solid white';
        }
    });

    downloadBtn.addEventListener('click', () => {
        let fileName = prompt('Enter the filename to download (without extension):', 'qrcode');

        if (fileName) {
            let tempCanvas = document.createElement('canvas');
            let tempCtx = tempCanvas.getContext('2d');
            tempCanvas.width = 250 + 10;
            tempCanvas.height = 250 + 10;

            tempCtx.fillStyle = 'white';
            tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
            tempCtx.drawImage(qrcodeContainer.firstChild, 5, 5, 250, 250);

            let dataUrl = tempCanvas.toDataURL('image/png');
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
});
