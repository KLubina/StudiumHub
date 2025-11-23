// Utility Functions
const Utils = {
  // Helper-Funktion: Sanitize ID
  sanitizeId(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
};
