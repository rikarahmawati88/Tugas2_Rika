const mongoose = require('mongoose') // impor mongoose

// skema untuk collection makanan
const makananSchema = new mongoose.Schema({
    deskripsi: {
        type: String,
        required: true, //wajib diisi
        trim: true
    },
    asalDaerah: {
        type: String,
        required: true,
        trim: true
    },
    menu_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Menu",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

//sertakan skema makanan ke dalam model makanan
const Makanan = mongoose.model("Makanan", makananSchema)
// expor model makanan
module.exports = Makanan
