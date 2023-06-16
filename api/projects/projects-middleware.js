// projects ara yazılımları buraya

const projectsModel = require("./projects-model");

async function checkProjectExists(req, res, next) {
  try {
    const projectId = req.params.id;
    const project = await projectsModel.get(projectId);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
    } else {
      req.project = project;
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function payloadValidation(req, res, next) {
  try {
    if (!req.body.name || !req.body.description) {
      res.status(400).json({
        message: "Please provide name, description",
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { checkProjectExists, payloadValidation };
