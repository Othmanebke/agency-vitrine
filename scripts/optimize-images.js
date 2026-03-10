const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '..', 'src', 'assets', 'portfolio');
const outputDir = path.join(__dirname, '..', 'src', 'assets', 'portfolio_optimized');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
    }

    files.forEach(file => {
        if (!file.match(/\.(jpg|jpeg|png)$/i)) return;

        const inputFile = path.join(inputDir, file);
        const outputFile = path.join(outputDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));

        sharp(inputFile)
            .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 75 })
            .toFile(outputFile)
            .then(info => {
                const originalSize = fs.statSync(inputFile).size / 1024;
                const newSize = info.size / 1024;
                console.log(`Converted: ${file} | Original: ${originalSize.toFixed(2)} KB -> New: ${newSize.toFixed(2)} KB`);
            })
            .catch(err => {
                console.error(`Error processing ${file}:`, err);
            });
    });
});
