const GalleryItem = require('../models/GalleryItem');

const VALID_COLLECTIONS = GalleryItem.VALID_COLLECTIONS;

/**
 * Create a new gallery item
 * @param {object} data - validated payload
 * @returns {object} created record
 */
function createItem(data) {
  return GalleryItem.create(data);
}

/**
 * Get a single gallery item
 * @param {number|string} id
 * @returns {object|undefined}
 */
function getItemById(id) {
  return GalleryItem.findById(id);
}

/**
 * List gallery items with pagination + filters
 * @returns {{ items: object[], total: number }}
 */
function listItems({ collection, isActive, limit, offset } = {}) {
  // Resolve isActive: undefined = all, 'true'/'1'/true = 1, else 0
  let activeFilter = undefined;
  if (isActive !== undefined && isActive !== null && isActive !== '') {
    activeFilter = isActive === 'true' || isActive === '1' || isActive === true;
  }

  const items = GalleryItem.list({ collection, isActive: activeFilter, limit, offset });
  const total = GalleryItem.count({ collection, isActive: activeFilter });
  return { items, total };
}

/**
 * Update metadata of a gallery item
 * @returns {{ updated: object }|{ notFound: true }}
 */
function updateItem(id, payload) {
  const existing = GalleryItem.findById(id);
  if (!existing) return { notFound: true };
  const updated = GalleryItem.update(id, payload);
  return { updated };
}

/**
 * Toggle active/inactive status
 * @returns {{ updated: object }|{ notFound: true }}
 */
function toggleItemActive(id) {
  const result = GalleryItem.toggleActive(id);
  if (!result) return { notFound: true };
  return { updated: result };
}

/**
 * Bulk reorder gallery items
 * @param {Array<{ id: number, sortOrder: number }>} items
 */
function reorderItems(items) {
  GalleryItem.reorder(items);
  return { reordered: true };
}

/**
 * Delete a gallery item; returns the old imagePath for file cleanup
 * @returns {{ deleted: true, imagePath: string }|{ notFound: true }}
 */
function deleteItem(id) {
  const removed = GalleryItem.remove(id);
  if (!removed) return { notFound: true };
  return { deleted: true, imagePath: removed.imagePath };
}

module.exports = {
  createItem,
  getItemById,
  listItems,
  updateItem,
  toggleItemActive,
  reorderItems,
  deleteItem,
  VALID_COLLECTIONS,
};
