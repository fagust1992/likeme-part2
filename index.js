const express = require("express");
const cors = require("cors");
const morgan = require("morgan-body");
const {
  agregarPost,
  obtenerPost,
  modificarlikes,
  sumarlikes,
  eliminarPost,
} = require("./post");

const app = express();
morgan(app);
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
    const { titulo, url, descripcion } = request.body;

    await agregarPost(titulo, url, descripcion);
    response.send("Post agregado");
  } catch (error) {
    response
      .status(500)
      .json({ message: error.message, code: error.code, error });
  }
});

app.put("/posts/:id", async (request, response) => {
  const { id } = request.params;
  const { likes } = request.query;
  try {
    await modificarlikes(likes, id);
    response.send("Likes modificado correctamente");
  } catch ({ code, message }) {
    response.status(code).send(message);
  }
});

app.patch("/posts/:id/likes", async (request, response) => {
  const { id } = request.params;
  try {
    await sumarlikes(id);
    response.send("Like aumentado");
  } catch ({ code, message }) {
    response.status(code).send(message);
  }
});

app.delete("/posts/:id", async (request, response) => {
  const { id } = request.params;
  await eliminarPost(id);
  response.send("Post elimando");
});

app.listen(PORT, () => {
  console.log(`estoy en el puertO ${PORT}`);
});
