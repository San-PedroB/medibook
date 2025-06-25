/**
 * Limpia un número de teléfono eliminando todos los caracteres no numéricos.
 * @param {string} phone El número con formato (ej: "+56 9 7777 0808")
 * @returns {string} El número limpio (ej: "56977770808")
 */
export function cleanPhoneNumber(phone) {
  return phone.replace(/\D/g, '');
}
