const mongoose = require('mongoose') // import mongosee

// skema untuk collection menu
const menuSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true, // wajib isi
        trim: true
    },
    jenisMenu: {
        type: String,
        required: true,
        trim: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})
// sertakan skema menu ke dalam model menu
const Menu = mongoose.model("Menu",menuSchema)
// expor model menu
module.exports = Menu
