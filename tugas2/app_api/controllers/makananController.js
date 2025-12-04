// impor model menu
const makananSchema = require("../models/makanan")

// fungsi untuk mendapatkan semua data makanan
const getAllMakanan = async (req, res) => {
    try {
        const result = await makananSchema.find().populate("menu_id", "nama")
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// fungsi untuk mengambil satu data makanan berdasarkan parameter id
const getMakananById = async (req, res) => {
    try {
        const result = await makananSchema.findById(req.params.id).populate("menu_id", "nama")
        if (!result) {
            res.status(400).json({ message: "makanan tidak ditemukan" })
        } else {
            res.status(200).json(result)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Membuat makanan baru (POST)
const createMakanan= async (req, res) => {
//Membuat instance makanan baru
    const makanan = new makananSchema ({ // Disesuaikan
        deskripsi: req.body.deskripsi,
        asalDaerah: req.body.asalDaerah,
        menu_id: req.body.menu_id
})
try{
    //Menyimpan berita baru ke database
    const hasil = await makanan.save();
    //beri respon json HTTP_CREATED
    res.status(201).json(hasil);
    } catch (error) {
    res.status(400).json({message: error})
    }
}

// fungsi untuk memperbarui(PUT) data makanan berdasrkan id
const updateMakananById = async (req, res) => {
    try {
        //GET collection makanan berdasarkan parameter id
        const result = await makananSchema.findById(req.params.id)
        if(!result){
            // Jika data makanan tidak ada pada MongoDB
            res.status(404).json({message: "Makanan tidak ditemukan"})
        }else{
            // Jika data makanan ada
            //Jika ada request perubahan deskripsi
            if(req.body.deskripsi != null){
                result.deskripsi = req.body.deskripsi
            }
            // Jika ada request perubahan asalDaerah
            if(req.body.asalDaerah != null){
                result.asalDaerah= req.body.asalDaerah
            }
            // update data makanan
            const updateMakanan = await result.save()
            res.status(200).json(updateMakanan)
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// fungsi menghapus isi collection makanan berdasarkan id
const deleteMakananById = async (req, res) => {
    try {
        //GET collection makanan berdasarkan parameter id
        const result = await makananSchema.findById(req.params.id)
        if(!result){
            // jika data makanan tidak ada di mongo DB
            res.status(404).json({message: "Makanan tidak ditemukan"})
        }else{
            // Jika data makanan ada, maka hapus data makanan berdasarkan id
            await result.deleteOne();
            res.status(200).json({message: "Makanan berhasil dihapus"})
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
}
// fungsi untuk memperbarui sebagian data makanan berdasarkan id (PATCH)
const patchMakananById = async (req, res) => {
     try {
    //GET collection menu berdasarkan parameter id
        const result = await makananSchema.findById(req.params.id)
        if(!result){
            // Jika data makanan tidak ada pada MongoDB
            res.status(404).json({message: "Makanan tidak ditemukan"})
        }else{
            // Jika data makanan ada
            //Jika ada request perubahan asalDaerah
            if(req.body.asalDaerah != null){
                result.asalDaerah = req.body.asalDaerah
            }
            // update data makanan
            const updateMakanan = await result.save()
            res.status(200).json(updateMakanan)
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


// export
module.exports = {
    getAllMakanan,
    getMakananById,
    createMakanan,
    updateMakananById,
    deleteMakananById,
    patchMakananById
}