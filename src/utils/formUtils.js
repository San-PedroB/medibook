// src/utils/formUtils.js

/**
 * Valida que todos los campos del formulario tengan valores válidos.
 * Soporta strings, fechas y otros tipos de datos básicos.
 */
export function validateFields(fieldsArray) {
  return fieldsArray.every((val) => {
    if (typeof val === "string") {
      return val.trim() !== "";
    }
    return val !== null && val !== undefined;
  });
}

/**
 * Valida que un texto sea no vacío.
 */
export function isValidText(text) {
  return typeof text === 'string' && text.trim().length > 0;
}

/**
 * Valida formato de RUT chileno simple.
 */
export function isValidRut(rut) {
  return typeof rut === 'string' && /^[0-9]+-[0-9kK]{1}$/.test(rut);
}

/**
 * Valida teléfono chileno completo (ej: 56912345678).
 */
export function isValidChileanPhoneFull(phone) {
  return typeof phone === 'string' && /^569\d{8}$/.test(phone);
}

/**
 * Valida que sea número.
 */
export function isValidNumber(num) {
  return !isNaN(num);
}

/**
 * Valida formato de URL.
 */
export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Valida formato básico de email.
 */
export function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
