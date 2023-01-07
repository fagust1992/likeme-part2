const express = require("express");
const cors = require("cors");
const { agregarPost, obtenerPost } = require("./post");

const app = express();

app.use(express.json());

app.use(cors());

app.use(express.static("public"));

const PORT = 3000;

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.get("/posts", async (request, response) => {
  try {
    const Posts = await obtenerPost();
    response.json(Posts);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/posts", async (request, response) => {
  try {
    const { titulo, imagen, descripcion } = request.body;

    await agregarPost(titulo, imagen, descripcion);
    response.send("Post agregado");
  } catch (error) {
    response.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`estoy en el puerto ${PORT}`);
});
