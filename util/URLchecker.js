const regexImgUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png|jpeg|jfif|webp|bmp)/gi
const regexGifUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:gif)/gi
const regexVidUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:mp4|webm|m4a|mov)/gi

function isImage(url) {
    return regexImgUrl.exec(url) != null;
}

function isGif(url) {
    return regexGifUrl.exec(url) != null;
}

function isVideo(url) {
    return regexVidUrl.exec(url) != null;
}

module.exports = {
    isImage,
    isGif,
    isVideo
}