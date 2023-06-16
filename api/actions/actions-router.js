// "eylem" routerını buraya yazın

const router = require("express").Router();
const mw = require("./actions-middleware.js");
const actionsModel = require("./actions-model.js");

router.get("/", async (req, res, next) => {
  try {
    const actions = await actionsModel.get();
    res.json(actions);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.checkProjectExists, (req, res, next) => {
  try {
    res.json(req.action);
  } catch (error) {
    next(error);
  }
});

router.post("/", mw.payloadValidation, async (req, res, next) => {
  try {
    const insertedProject = await actionsModel.insert({
      project_id: req.body.project_id,
      description: req.body.description,
      notes: req.body.notes,
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
      const updatedProject = await actionsModel.update(id, req.body);
      res.json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", mw.checkProjectExists, async (req, res, next) => {
  try {
    await actionsModel.remove(req.params.id);

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
