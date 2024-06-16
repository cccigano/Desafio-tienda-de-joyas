const db = require("../utils/database");
const { getByFilters } = require("../models/joyasModel");

const getAllJoyas = async (req, res) => {
  try {
    const { limits = 10, page = 1, order_by = "id_ASC" } = req.query;

    const orderSplit = order_by.split("_");
    const column = orderSplit[0] || "id";
    const direction = (orderSplit[1] || "ASC").toUpperCase();

    if (direction !== "ASC" && direction !== "DESC") {
      throw new Error("Dirección de ordenación inválida. Debe ser ASC o DESC.");
    }

    const limit = parseInt(limits) || 10;
    const offset = (parseInt(page) - 1) * limit || 0;

    const query = `
      SELECT * FROM inventario
      ORDER BY ${column} ${direction}
      LIMIT $1 OFFSET $2
    `;
    const values = [limit, offset];

    const result = await db.query(query, values);

    res.json({
      data: result.rows,
      _links: {
        self: `/api/joyas?limits=${limit}&page=${page}&order_by=${order_by}`,
        next: `/api/joyas?limits=${limit}&page=${
          parseInt(page) + 1
        }&order_by=${order_by}`,
        prev: `/api/joyas?limits=${limit}&page=${Math.max(
          1,
          parseInt(page) - 1
        )}&order_by=${order_by}`,
      },
    });
  } catch (error) {
    console.error("Error en getAllJoyas:", error);
    res.status(500).json({ error: error.message });
  }
};

// /joyas/filtros

const getJoyasByFilters = async (req, res) => {
  try {
    const { precio_min, precio_max, categoria, metal } = req.query;

    console.log("Parámetros de filtro:", {
      precio_min,
      precio_max,
      categoria,
      metal,
    });

    const joyas = await getByFilters(precio_min, precio_max, categoria, metal);

    console.log("Resultados del filtro:", joyas);

    res.json(joyas);
  } catch (error) {
    console.error("Error al filtrar joyas:", error);
    res.status(500).json({ error: "Error al filtrar joyas" });
  }
};

module.exports = {
  getAllJoyas,
  getJoyasByFilters,
};
