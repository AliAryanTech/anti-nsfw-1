const nsfwjs = require('nsfwjs');
const axios = require('axios')
const tf = require('@tensorflow/tfjs-node')

let model;

async function onStart() {
    model = await nsfwjs.load()
    console.log('Loaded nsfw.js\ntest image:')
    console.dir(await classify('https://nerdist.com/wp-content/uploads/2020/07/maxresdefault.jpg'))
}

async function classify(imgurl) {
    if (!model)
        return;

    const pic = await axios.get(imgurl, {responseType: 'arraybuffer'})
    const img = await tf.node.decodeImage(pic.data,3)

    const classifications = await model.classify(img)
    img.dispose()

    return classifications;
}

const info = {
    "name":"nsfw",
    "desc":"Loads nsfw.js, and is used to check for nsfw content."
}

function onMessage() {
    return;
}

function onReady() {
    return;
}

module.exports = {
    onStart,
    classify,
    onMessage,
    onReady,
    info
}