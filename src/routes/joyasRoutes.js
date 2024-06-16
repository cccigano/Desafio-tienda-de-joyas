const express = require("express");
const {
  getAllJoyas,
  getJoyasByFilters,
} = require("../controllers/joyasController");
const logRequest = require("../middlewares/logger");

const router = express.Router();

router.use(logRequest);

// ruta HATEOAS
router.get("/joyas", getAllJoyas);

// ruta joyas filtradas
router.get("/joyas/filtros", getJoyasByFilters);

module.exports = router;
