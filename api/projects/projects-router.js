// "project" routerını buraya yazın!
const router = require("express").Router();
const mw = require("./projects-middleware.js");
const projectsModel = require("./projects-model.js");

router.get("/", async (req, res, next) => {
  try {
    const projects = await projectsModel.get();
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.checkProjectExists, (req, res, next) => {
  try {
    res.json(req.project);
  } catch (error) {
    next(error);
  }
});

router.post("/", mw.payloadValidation, async (req, res, next) => {
  try {
    const insertedProject = await projectsModel.insert({
      name: req.body.name,
      description: req.body.description,
      completed: req.body.completed,
    });
    res.json(insertedProject);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  mw.checkProjectExists,
  mw.payloadValidation,
  async (req, res, next) => {
    const id = req.params.id;

    try {
      const updatedProject = await projectsModel.update(id, {
        name: req.body.name,
        description: req.body.description,
        completed: req.body.completed,
      });
      res.json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", mw.checkProjectExists, async (req, res, next) => {
  try {
    await projectsModel.remove(req.params.id);

    next();
  } catch (error) {
    next(error);
  }
});

router.get("/:id/actions", mw.checkProjectExists, async (req, res, next) => {
  const id = req.params.id;

  try {
    const postsComments = await projectsModel.getProjectActions(id);

    res.json(postsComments);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
