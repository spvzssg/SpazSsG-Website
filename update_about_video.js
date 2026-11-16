const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const videoPath = 'D:\\Downloads\\Spaz_AI\\3D spinning logo-favicon.webm';
if (fs.existsSync(videoPath)) {
    const videoBuffer = fs.readFileSync(videoPath);
    const base64Video = videoBuffer.toString('base64');
    const dataUri = `data:video/webm;base64,${base64Video}`;

    const oldAboutImageHtml = `<div class="about-image">\n                    <i class="fa-solid fa-crown" style="font-size: 5rem; color: var(--brand-orange);"></i>\n                </div>`;
    const newAboutImageHtml = `<div class="about-image" style="overflow: hidden; padding: 0;">\n                    <video autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; display: block;">\n                        <source src="${dataUri}" type="video/webm">\n                    </video>\n                </div>`;

    if (html.includes(oldAboutImageHtml)) {
        html = html.replace(oldAboutImageHtml, newAboutImageHtml);
        console.log('Successfully embedded about video.');
    } else {
        console.log('Exact match not found, using regex replacement for about-image.');
        html = html.replace(/<div class="about-image">[\s\S]*?<\/div>/, `<div class="about-image" style="overflow: hidden; padding: 0;">\n                    <video autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; display: block;">\n                        <source src="${dataUri}" type="video/webm">\n                    </video>\n                </div>`);
    }
} else {
    console.log('Video file not found at:', videoPath);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated successfully with about video.');
