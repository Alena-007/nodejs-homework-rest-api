const { updateContact } = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const { contactSchema } = require("../../schemas/contacts");

const updateById = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
