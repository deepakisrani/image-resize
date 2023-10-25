const validFormats = ['jpg', 'png', 'webp'];

const getRequestDetails = function(dimensions, fileName) {
    let width = null, height = null, originalFormat = null, validRequest = false, validFormat = false;

    if(dimensions && fileName) {
        const dimensionDetails = dimensions.split('x');
        const imageDetails = fileName.split('.');
        validRequest = (dimensionDetails.length === 2) && (imageDetails.length === 2);
        
        if(validRequest) {
            width = parseInt(dimensionDetails[0]);
            height = parseInt(dimensionDetails[1]);
            originalFormat = imageDetails[imageDetails.length - 1];
            validFormat = isValidFormat(originalFormat);
        }   
    }

    return { height, width, originalFormat, validFormat, validRequest };
};

const isValidFormat = function(format) {
    return validFormats.includes(format);
};

module.exports = {
    getRequestDetails,
    isValidFormat
};