// utils/validation.js - Input validation utilities

/**
 * Validate support request input
 * @param {Object} data - Request data to validate
 * @returns {Object} Validation result with valid flag and any errors
 */
function validateRequest(data) {
  const errors = [];
  const { name, email, subject, complaint } = data;

  // Check required fields
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is required and must be a non-empty string');
  }

  if (!email || !isValidEmail(email)) {
    errors.push('Valid email address is required');
  }

  if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
    errors.push('Subject is required and must be a non-empty string');
  }

  if (!complaint || typeof complaint !== 'string' || complaint.trim().length === 0) {
    errors.push('Complaint/Description is required and must be a non-empty string');
  }

  // Check length constraints
  if (name && name.length > 100) {
    errors.push('Name must not exceed 100 characters');
  }

  if (subject && subject.length > 200) {
    errors.push('Subject must not exceed 200 characters');
  }

  if (complaint && complaint.length > 5000) {
    errors.push('Complaint must not exceed 5000 characters');
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : null
  };
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === 'string' && emailRegex.test(email) && email.length <= 255;
}

module.exports = { validateRequest, isValidEmail };
