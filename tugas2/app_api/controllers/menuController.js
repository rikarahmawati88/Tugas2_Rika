// impor model menu
const menuSchema = require("../models/menu")

// fungsi untuk mendapatkan semua data menu
const getAllMenu = async (req, res) => {
    try {
        //GET collection menu
        const result = await menuSchema.find()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

// fungsi untuk mengambil satu data menu berdasarkan parameter id
const getMenuById = async (req, res) => {
    try {
        //GET collection menu berdasarkan parameter id
        const result = await menuSchema.findById(req.params.id)
        if(!result){
            // Jika data menu tidak ada pada MongoDB
            res.status(404).json({message: "Menu tidak ditemukan"})
        }else{
            // Jika data menu ada
            res.status(200).json(result)
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Membuat menu baru (POST)
const createMenu = async (req, res) => {
//Membuat instance menu baru
    const menu = new menuSchema ({ // Disesuaikan
        nama: req.body.nama,
        jenisMenu: req.body.jenisMenu
})
try{
    //Menyimpan berita baru ke database
    const hasil = await menu.save();
    //beri respon json HTTP_CREATED
    res.status(201).json(hasil);
    } catch (error) {
    res.status(400).json({message: error})
    }
}

// fungsi untuk memperbarui(PUT) data menu berdasrkan id
const updateMenuById = async (req, res) => {
    try {
        //GET collection menu berdasarkan parameter id
        const result = await menuSchema.findById(req.params.id)
        if(!result){
            // Jika data menu tidak ada pada MongoDB
            res.status(404).json({message: "Menu tidak ditemukan"})
        }else{
            // Jika data menu ada
            //Jika ada request perubahan nama
            if(req.body.nama != null){
                result.nama = req.body.nama
            }
            // Jika ada request perubahan jenisMenu
            if(req.body.jenisMenu != null){
                result.jenisMenu = req.body.jenisMenu
            }
            // update data menu
            const updateMenu = await result.save()
            res.status(200).json(updateMenu)
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// fungsi menghapus isi collection menu berdasarkan id
const deleteMenuById = async (req, res) => {
    try {
        //GET collection menu berdasarkan parameter id
        const result = await menuSchema.findById(req.params.id)
        if(!result){
            // jika data menu tidak ada di mongo DB
            res.status(404).json({message: "Menu tidak ditemukan"})
        }else{
            // Jika data menu ada, maka hapus data menu berdasarkan id
            await result.deleteOne();
            res.status(200).json({message: "Menu berhasil dihapus"})
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
}
// fungsi untuk memperbarui sebagian data menu berdasarkan id (PATCH)
const patchMenuById = async (req, res) => {
     try {
    //GET collection menu berdasarkan parameter id
        const result = await menuSchema.findById(req.params.id)
        if(!result){
            // Jika data menu tidak ada pada MongoDB
            res.status(404).json({message: "Menu tidak ditemukan"})
        }else{
            // Jika data menu ada
            //Jika ada request perubahan nama
            if(req.body.nama != null){
                result.nama = req.body.nama
            }
            // update data menu
            const updateMenu = await result.save()
            res.status(200).json(updateMenu)
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


// export
module.exports = {
    getAllMenu,
    getMenuById,
    createMenu,
    updateMenuById,
    deleteMenuById,
    patchMenuById
}