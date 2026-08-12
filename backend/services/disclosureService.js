const MandatoryDisclosure = require('../models/MandatoryDisclosure');

function listDisclosures() {
  return MandatoryDisclosure.find();
}

function getDisclosureById(id) {
  return MandatoryDisclosure.findById(id);
}

function createDisclosure(data) {
  return MandatoryDisclosure.create(data);
}

function updateDisclosure(id, data) {
  const existing = MandatoryDisclosure.findById(id);
  if (!existing) return { notFound: true };
  return {
    previous: existing,
    updated: MandatoryDisclosure.update(id, data),
  };
}

function deleteDisclosure(id) {
  const existing = MandatoryDisclosure.findById(id);
  if (!existing) return { notFound: true };
  MandatoryDisclosure.remove(id);
  return { deleted: true, previous: existing };
}

module.exports = {
  listDisclosures,
  getDisclosureById,
  createDisclosure,
  updateDisclosure,
  deleteDisclosure,
};
