const express = require("express");
const Joi = require("joi");
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getContactById(id);
    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id=${id} not found`,
      });
      return;
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: `Contact missing required field`,
      });
      return;
    }
    const { name, email, phone } = req.body;
    const result = await addContact(name, email, phone);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: `Missing fields`,
      });
      return;
    }
    const { id } = req.params;
    const result = await updateContact(id, req.body);
    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id=${id} not found`,
      });
      return;
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await removeContact(id);
    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id=${id} not found`,
      });
      return;
    }
    res.json({
      status: "success",
      code: 200,
      message: `Contact with id=${id} deleted`,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
