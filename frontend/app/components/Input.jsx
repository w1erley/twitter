'use client';

import clsx from 'clsx';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister
} from 'react-hook-form';

const Input = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled
}) => {
  return (
    <div className='form-group mb-3'>
      <label
        className="
        "
        htmlFor={id}
      >
        {label}
      </label>
      <br/>
      <input
        id={id}
        type={type}
        autoComplete={id}
        disabled={disabled}
        {...register(id, { required })}
        className={clsx(`
          form-control
          rounded
          py-1
        `,
          errors[id] && "focus:ring-rose-500",
          disabled && "opacity-50 cursor-default"
        )}
      />
    </div>
   );
}

export default Input;
