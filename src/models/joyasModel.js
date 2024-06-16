const db = require("../utils/database");

/**
filtrados x precio, categoría y metal.
  @param {number|string} precio_min 
 @param {number|string} precio_max 
  @param {string} categoria 
  @param {string} metal 
  @returns {Promise<Array>} 
 */
const getByFilters = async (precio_min, precio_max, categoria, metal) => {
  let query = `SELECT * FROM inventario WHERE 1=1`;
  const values = [];

  if (precio_min !== undefined && precio_min !== null && !isNaN(precio_min)) {
    query += ` AND precio >= $${values.length + 1}`;
    values.push(precio_min);
  }
  if (precio_max !== undefined && precio_max !== null && !isNaN(precio_max)) {
    query += ` AND precio <= $${values.length + 1}`;
    values.push(precio_max);
  }
  if (categoria) {
    query += ` AND categoria = $${values.length + 1}`;
    values.push(categoria);
  }
  if (metal) {
    query += ` AND metal = $${values.length + 1}`;
    values.push(metal);
  }

  try {
    const result = await db.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error fetching filtered data:", error);
    throw error;
  }
};

module.exports = {
  getByFilters,
};
