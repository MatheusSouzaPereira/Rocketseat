const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repositorie = {
    id: uuid(),
    title,
    url: "https://github.com/MatheusSouzaPereira/Rocketseat",
    techs: [""],
  };

  repositories.push(repositorie);
  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(
    (repositorie) => repositorie.id === id
  );

  if (repositorieIndex < 0) {
    return response.status(400).json({ error: "Project not found" });
  }

  const repositorie = {
    id: uuid(),
    title,
    url: "https://github.com/MatheusSouzaPereira/Rocketseat",
    techs: [""],
  };

  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(
    (repositorie) => repositorie.id === id
  );

  if (repositorieIndex < 0) {
    return response.status(400).json({ error: "Project not found" });
  }

  repositories.splice(repositorieIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((obj) => obj.id == id);

  if (index < 0) {
    return response.status(400).json({ mensage: "Repository not found" });
  }

  let repository = repositories[index];
  repository.likes = repository.likes + 1;
  repositories[index] = repository;

  return response.status(200).json(repository);
});

module.exports = app;
