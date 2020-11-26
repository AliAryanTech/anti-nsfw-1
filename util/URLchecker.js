const regexImgUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png|jpeg|jfif|webp|bmp)/gi
const regexGifUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:gif)/gi

function isImageURL(url) {
    return regexImgUrl.exec(url) != null;
}

function isGif() {
    return regexGifUrl.exec(url) != null;
}

module.exports = {
    isImageURL
}