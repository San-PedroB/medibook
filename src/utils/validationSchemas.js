// src/utils/validationSchemas.js

import {
  isValidText,
  isValidNumber,
  isValidRut,
  isValidEmail,
  isValidUrl,
  isValidChileanPhoneFull
} from './formUtils';


export function validateRegisterAdminCompanyForm({ admin, company, account }) {
  const errors = {};

  const textFields = [
    { obj: admin, key: 'firstName', min: 3, max: 20 },
    { obj: admin, key: 'lastNameP', min: 3, max: 20 },
    { obj: admin, key: 'lastNameM', min: 3, max: 20 },
    { obj: company, key: 'name', min: 3, max: 40 },
    { obj: company, key: 'businessName', min: 3, max: 40 },
    { obj: company, key: 'industry', min: 3, max: 40 },
    { obj: company, key: 'street', min: 3, max: 30 },
    { obj: company, key: 'city', min: 3, max: 30 }
  ];

  textFields.forEach(({ obj, key, min, max }) => {
    if (!isValidText(obj[key], min, max)) errors[key] = 'Formato inválido';
  });

  if (!/^[0-9]{7,8}-[0-9Kk]$/.test(admin.rutAdmin) || !isValidRut(admin.rutAdmin)) errors.rutAdmin = 'Formato inválido';
  if (!/^[0-9]{7,8}-[0-9Kk]$/.test(company.rutCompany) || !isValidRut(company.rutCompany)) errors.rutCompany = 'Formato inválido';

  if (!isValidChileanPhoneFull(admin.phoneAdmin)) errors.phoneAdmin = 'Formato inválido';
  if (!isValidChileanPhoneFull(company.phoneCompany)) errors.phoneCompany = 'Formato inválido';

  if (!isValidNumber(company.number, 1, 6)) errors.number = 'Formato inválido';
  if (company.office && company.office.trim().length > 20) errors.office = 'Formato inválido';

  if (company.website && !isValidUrl(company.website)) errors.website = 'Formato inválido';

  if (!isValidEmail(account.email)) errors.email = 'Formato inválido';
  if (account.password.length < 8 || account.password.length > 32) errors.password = 'Formato inválido';
  if (account.password !== account.confirmPassword) errors.confirmPassword = 'Formato inválido';

  return errors;
}

export function validatePatientForm(patient) {
  const errors = {};

  if (!isValidText(patient.firstName, 3, 20)) errors.firstName = "Formato inválido";
  if (!isValidText(patient.lastNameP, 3, 20)) errors.lastNameP = "Formato inválido";
  if (!isValidText(patient.lastNameM, 3, 20)) errors.lastNameM = "Formato inválido";

  if (!/^[0-9]{7,8}-[0-9Kk]$/.test(patient.rut) || !isValidRut(patient.rut)) {
    errors.rut = "RUT inválido";
  }

  if (!isValidChileanPhoneFull(patient.phone)) errors.phone = "Teléfono inválido";

  if (!isValidEmail(patient.email)) errors.email = "Email inválido";

  if (!isValidText(patient.address, 3, 100)) errors.address = "Dirección inválida";

  // Agrega más validaciones según necesidad (fecha, género, previsión...)

  return errors;
}
