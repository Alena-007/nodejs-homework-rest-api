const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

module.exports = updateById;
