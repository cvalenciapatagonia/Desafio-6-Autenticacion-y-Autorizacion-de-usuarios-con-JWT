require('colors')
const message = (port) => {
    console.clear()
    console.log('======================================='.blue)
    console.log(`          SERVER ON PORT: ${port}         `.bgWhite.black)
    console.log('======================================='.blue)
}

module.exports = message