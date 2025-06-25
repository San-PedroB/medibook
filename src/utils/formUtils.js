export function validateFields(fields) {
  return fields.every(value =>
    Array.isArray(value)
      ? value.length > 0
      : typeof value === "string" && value.trim() !== ""
  );
}

//Validar formato rut
export function isValidRut(rut) {
  rut = rut.replace(/\./g, '').replace('-', '');
  if (rut.length < 8) return false;
  const body = rut.slice(0, -1);
  let dv = rut.slice(-1).toUpperCase();
  let sum = 0, mul = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body.charAt(i)) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }
  let res = 11 - (sum % 11);
  let verif = res === 11 ? '0' : res === 10 ? 'K' : res.toString();
  return dv === verif;
}
//----------------------------------------------------------------------

// Valida múltiples campos tipo texto con sus límites

export function validateTextLength(fields) {
  const errors = {};
  fields.forEach(({ obj, key, min, max }) => {
    const value = obj[key];
    if (!isValidText(value, min, max)) {
      errors[key] = 'Formato inválido';
    }
  });
  return errors;
}

//-----------------------------------------------------------------------

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidText(str, min, max) {
  return typeof str === 'string' && str.trim().length >= min && str.trim().length <= max;
}

export function isValidChileanPhone(number) {
  // Quita espacios, guiones, paréntesis, etc.
  const clean = number.replace(/\D/g, '');
  // Debe tener 9 dígitos, comenzar con 9
  return clean.length === 9 && clean.startsWith('9');
}

export function isValidChileanPhoneFull(number) {
  // número como string: '56912345678'
  return /^56[9]\d{8}$/.test(number);
}


export function isValidNumber(str, min = 1, max = 6) {
  return /^\d+$/.test(str.trim()) && str.trim().length >= min && str.trim().length <= max;
}

export function isValidUrl(url) {
  return !url || /^(ftp|http|https):\/\/[^ "]+$/.test(url.trim());
}

