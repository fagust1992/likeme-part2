const { Pool } = require("pg"); // traigo el pool
const credenciales = {
  // pool con las credenciales
  host: "localhost",
  user: "postgres",
  password: "fagust",
  database: "likeme",
  allowExitOnIdle: true,
};
const pool = new Pool(credenciales); // instancio el pool

const getDate = async () => {
  const result = await pool.query("SELECT NOW()");
  console.log(result);
};

const agregarPost = async (titulo, Imagen, descripcion) => {
  // funcion  que ejecuta la consulta sql
  const consulta = "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3)";

  if ((titulo != "") & (Imagen != "") & (descripcion != "")) {
    const values = [titulo, Imagen, descripcion];
    const result = await pool.query(consulta, values);
    console.log(result);
    return result;
  }
};

const obtenerPost = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  if (rows.length > 0) {
    console.log(rows);
    return rows;
  }
};

obtenerPost();
module.exports = { agregarPost, obtenerPost };
