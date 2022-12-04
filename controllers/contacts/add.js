const { addContact } = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const { contactSchema } = require("../../schemas/contacts");

const add = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { name, email, phone } = req.body;
    const result = await addContact(name, email, phone);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
