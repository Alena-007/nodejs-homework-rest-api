const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;
  if (!favorite) {
    throw HttpError(400, `Contact with id=${id} missing field favorite`);
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

module.exports = updateStatusContact;
