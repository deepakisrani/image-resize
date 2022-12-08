const fs = require('fs');
const sharp = require('sharp');

const rootPath = 'images';
const originalFiles = '0x0';

const processImage = async function(fileName, requestFormat, width, height) {
    
    var requestPath = `${rootPath}/${width}x${height}`;
    if (!fs.existsSync(requestPath)){
        fs.mkdirSync(requestPath);
    }

    let requestFileName = fileName;
    if(requestFormat) {
        let details = requestFileName.split('.');
        details[details.length - 1] = requestFormat;
        requestFileName = details.join('.');
    }

    const outputPath = `${requestPath}/${requestFileName}`;

    if(!fs.existsSync(outputPath)) {
        const originalPath = `${rootPath}/${originalFiles}/${fileName}`;
        await transformFile(originalPath, requestFormat, width, height, outputPath);
    }

    return outputPath;
};

const streamData = function(outputPath) {
    return fs.createReadStream(outputPath);
}


const transformFile = async function(originalPath, requestFormat, width, height, outputPath) {
    let transform = sharp(originalPath);

    if (requestFormat) {
        transform = transform.toFormat(requestFormat);
    }

    if (width || height) {
        transform = transform.resize(width, height);
    }

    await transform.toFile(outputPath);
}

const isValidFile = function(fileName) {
    let valid = false;

    try {
        valid = fs.existsSync(`${rootPath}/${originalFiles}/${fileName}`);
    } catch(err) {
        console.error(err)
    }

    return valid;
};

module.exports = {
    processImage,
    isValidFile,
    streamData
};