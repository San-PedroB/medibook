// src/components/formElements/PhoneInput.jsx
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import FieldError from './FieldError';

export default function PhoneInputField({
  value = '',
  onChange = () => {},
  name = 'phone',
  label = 'Teléfono',
  country = 'cl',
  onlyCountries = ['cl'],
  isInvalid = false,
  errorMessage = '',
  placeholder = '',
  ...rest
}) {
  return (
    <div className='mb-3'>
      {label && <label className='form-label'>{label}</label>}
      <PhoneInput
        country={country}
        onlyCountries={onlyCountries}
        value={value}
        onChange={phone => onChange({ target: { name, value: phone } })}
        placeholder={placeholder}
        inputProps={{
          name,
          required: true,
          autoFocus: false,
          ...rest
        }}
        // ❌ quitamos esto: masks={{ cl: '(9) XXXX XXXX' }}
        // ❌ también evitamos enableAreaCodes
        containerStyle={{ width: '100%' }}
        inputStyle={{
          width: '100%',
          height: '38px',
          fontSize: '1rem',
          paddingLeft: '60px',
          paddingRight: '0.75rem',
          border: '1px solid #CED4DA',
          borderRadius: '0.25rem',
          lineHeight: '1.5'
        }}
        buttonStyle={{
          border: '1px solid #CED4DA',
          borderRight: 'none',
          height: '38px',
          backgroundColor: '#fff',
          borderRadius: '0.25rem 0 0 0.25rem'
        }}
        inputClass={isInvalid ? 'is-invalid' : ''}
      />
      <FieldError message={errorMessage} />
    </div>
  );
}
