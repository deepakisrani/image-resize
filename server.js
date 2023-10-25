const express = require('express');
var sanitize = require("sanitize-filename");
const { isValidFile, processImage, streamData } = require('./fileHelper');
const { getRequestDetails, isValidFormat } = require('./requestHelper');

const port  = 8000;
const server = express();

server.get('/:dimensions/:domain/:img', async (req, res) => {
    let { dimensions, domain, img } = req.params;
    let { f } = req.query;
    domain = sanitize(domain);
    
    let { height, width, originalFormat, validFormat, validRequest } = getRequestDetails(dimensions, img);

    if(!validRequest || !validFormat || !isValidFile(domain, img)) {
        res.status(404).send("File Not Found!");
    }

    let requestFormat = f && isValidFormat(f) ? f : null;
    let responsePath = await processImage(domain, img, requestFormat, width, height);
    
    res.type(`image/${requestFormat || originalFormat}`);
    streamData(responsePath).pipe(res);
});

server.listen(port, () => {
    console.log(`Server started on port ${port}!`);
});