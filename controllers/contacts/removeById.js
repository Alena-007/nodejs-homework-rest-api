const { removeContact } = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const removeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await removeContact(id);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json({
      message: `Contact with id=${id} deleted`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;
