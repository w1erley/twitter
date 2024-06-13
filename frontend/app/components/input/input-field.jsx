import cn from 'clsx';
import React from 'react';

export function InputField({
  label,
  inputId,
  inputValue,
  inputLimit,
  useTextArea,
  errorMessage,
  handleChange,
  handleKeyboardShortcut
}) {
  const slicedInputValue = inputValue ? inputValue.slice(0, inputLimit) : '';

  const inputLength = slicedInputValue.length;
  const isHittingInputLimit = inputLimit && inputLength > inputLimit;

  return (
    <div className='flex flex-col gap-1'>
      <div
        className={cn(
          'relative rounded ring-1 transition-shadow duration-200',
          errorMessage
            ? 'ring-accent-red'
            : `ring-light-line-reply focus-within:ring-2
               focus-within:!ring-main-accent dark:ring-dark-border`
        )}
      >
        <label
          className={cn(
            `group-peer absolute left-3 translate-y-1 bg-main-background text-sm
             text-light-secondary transition-all peer-placeholder-shown:translate-y-3
             peer-placeholder-shown:text-lg peer-focus:translate-y-1 peer-focus:text-sm
             dark:text-dark-secondary`,
            errorMessage
              ? '!text-accent-red peer-focus:text-accent-red'
              : 'peer-focus:text-main-accent'
          )}
          htmlFor={inputId}
        >
          {label}
        </label>
        {useTextArea ? (
          <textarea
            className='peer form-control mt-6 w-full resize-none bg-inherit px-3 pb-1
                       placeholder-transparent outline-none transition'
            id={inputId}
            placeholder={inputId}
            onChange={!isHittingInputLimit ? handleChange : undefined}
            onKeyUp={handleKeyboardShortcut}
            value={slicedInputValue}
            rows={3}
          />
        ) : (
          <input
            className='peer form-control mt-6 w-full bg-inherit px-3 pb-1
                       placeholder-transparent outline-none transition'
            id={inputId}
            type='text'
            placeholder={inputId}
            onChange={!isHittingInputLimit ? handleChange : undefined}
            value={slicedInputValue}
            onKeyUp={handleKeyboardShortcut}
          />
        )}
        {inputLimit && (
          <span
            className={cn(
              `absolute right-3 top-0 translate-y-1 text-sm text-light-secondary transition-opacity
               duration-200 peer-focus:visible peer-focus:opacity-100 dark:text-dark-secondary`,
              errorMessage ? 'visible opacity-100' : 'invisible opacity-0'
            )}
          >
            {inputLength} / {inputLimit}
          </span>
        )}
      </div>
      {errorMessage && (
        <p className='text-sm text-accent-red'>{errorMessage}</p>
      )}
    </div>
  );
}
