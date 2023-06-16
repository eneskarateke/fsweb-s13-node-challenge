const express = require("express");
const server = express();

// Sunucunuzu yapılandırın
// Eylem routerınızı /api/actions/actions-router.js içinde oluşturun
// Proje roterlarınızı /api/projects/projects-router.js içinde oluşturun
// Bu dosyanın içinde `server.listen()` YAPMAYIN!

const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

server.use(express.json());

server.use("/api/actions", actionsRouter);

server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
  res.json({ message: "server'in main domain'i, server is working" });
});

module.exports = server;
