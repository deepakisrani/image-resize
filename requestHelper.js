const validFormats = ['jpg', 'png', 'webp'];

const getRequestDetails = function(dimensions, fileName) {
    const dimensionDetails = dimensions.split('x');    
    let validRequest = dimensionDetails.length === 2;
    let width = validRequest ? parseInt(dimensionDetails[0]) : null;
    let height = validRequest ? parseInt(dimensionDetails[1]) : null;

    const imageDetails = fileName.split('.');
    let originalFormat = imageDetails[imageDetails.length - 1];
    let validFormat = isValidFormat(originalFormat);

    return { height, width, originalFormat, validFormat, validRequest };
};

const isValidFormat = function(format) {
    return validFormats.includes(format);
};

module.exports = {
    getRequestDetails,
    isValidFormat
};