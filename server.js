const express = require('express');
const { isValidFile, processImage, streamData } = require('./fileHelper');
const { getRequestDetails, isValidFormat } = require('./requestHelper');

const port  = 8000;
const server = express();

server.get('/:dimensions/:img', async (req, res) => {
    let { dimensions, img } = req.params;
    let { f } = req.query;
    
    let { height, width, originalFormat, validFormat, validRequest } = getRequestDetails(dimensions, img);

    if(!isValidFile(img) || !validRequest || !validFormat) {
        res.status(404).send("File Not Found!");
    }

    let requestFormat = f && isValidFormat(f) ? f : null;
    let responsePath = await processImage(img, requestFormat, width, height);
    
    res.type(`image/${requestFormat || originalFormat}`);
    streamData(responsePath).pipe(res);
});

server.listen(port, () => {
    console.log(`Server started on port ${port}!`);
});