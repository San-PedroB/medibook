import { useState } from 'react';

const useFormField = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    value,
    setValue,
    onChange,
    reset,
  };
};

export default useFormField;
