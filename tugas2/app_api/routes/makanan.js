const express = require("express")
const router = express.Router();

//impor makananController
const makananController = require("../controllers/makananController")

// route GET untuk mendaptkan semua data makanan
router.get("/", makananController.getAllMakanan)

// route GET id menampilkan satu data makanan berdasarkan ID
router.get("/:id",makananController.getMakananById)

//route POST untuk membuat data makanan baru
router.post("/", makananController.createMakanan)

//route PUT untuk memperbarui/mengubah/UPDATE makanan berdasarkan ID
router.put("/:id",makananController.updateMakananById)

// route Delete untuk menghapus data makanan berdasarakan ID
router.delete("/:id",makananController.deleteMakananById)

//route PATCH untuk memperbarui sebagian data makanan berdasarkan ID
router.patch('/:id',makananController.patchMakananById)

// Mengeksport router agar dpt digunakan 
// di file lain (misal, di app.js)
//expor module
module.exports = router;