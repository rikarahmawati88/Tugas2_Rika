const express = require("express")
const router = express.Router();

//impor menuController
const menuController = require("../controllers/menuController")

// route GET untuk mendaptkan semua data menu
router.get("/", menuController.getAllMenu)

// route GET id menampilkan satu data menu berdasarkan ID
router.get("/:id",menuController.getMenuById)

//route POST untuk membuat data menu baru
router.post("/", menuController.createMenu)

//route PUT untuk memperbarui/mengubah/UPDATE menu berdasarkan ID
router.put("/:id",menuController.updateMenuById)

// route Delete untuk menghapus data menu berdasarakan ID
router.delete("/:id",menuController.deleteMenuById)

// Mengeksport router agar dpt digunakan 
// di file lain (misal, di app.js)
//expor module
module.exports = router;