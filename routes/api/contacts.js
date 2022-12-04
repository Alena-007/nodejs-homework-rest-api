const express = require("express");

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validateBody(schemas.contactSchema), ctrlWrapper(ctrl.add));

router.put(
  "/:id",
  validateBody(schemas.contactSchema),
  ctrlWrapper(ctrl.updateById)
);

router.delete("/:id", ctrlWrapper(ctrl.removeById));

module.exports = router;
