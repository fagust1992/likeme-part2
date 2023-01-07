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
  if ((titulo != "") & (Imagen != "") & (descripcion != "")) {
    try {
      const consulta = "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3,0)";
      const values = [titulo, Imagen, descripcion];
      const result = await pool.query(consulta, values);
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }
};

const obtenerPost = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  if (rows.length > 0) {
    console.log(rows);
    return rows;
  }
};

const modificarlikes = async (likes, id) => {
  const consulta = "UPDATE posts SET likes = $1 WHERE id = $2";
  const values = [likes, id];
  const { rowCount } = await pool.query(consulta, values);
  if (rowCount === 0) {
    throw { code: 404, message: "No existe ningún post con este id" };
  }
};

const sumarlikes = async (id) => {
  const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1";
  const values = [id];
  const { rowCount } = await pool.query(consulta, values);
  if (rowCount === 0) {
    throw { code: 404, message: "No se consiguió ningún post con este id" };
  }
};

const eliminarPost = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1";
  const values = [id];
  const result = await pool.query(consulta, values);
};

obtenerPost();
module.exports = {
  agregarPost,
  obtenerPost,
  modificarlikes,
  sumarlikes,
  eliminarPost,
};
