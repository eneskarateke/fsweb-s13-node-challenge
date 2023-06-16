// eylemlerle ilgili ara katman yazılımları yazın

const actionsModel = require("./actions-model");

async function checkProjectExists(req, res, next) {
  try {
    const projectId = req.params.id;
    const project = await actionsModel.get(projectId);
    if (project) {
      req.project = project;
      next();
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    next(error);
  }
}

async function payloadValidation(req, res, next) {
  try {
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
      res.status(400).json({
        message: "Please provide id, description, and notes",
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { checkProjectExists, payloadValidation };
