import React, { useEffect } from 'react'
import { useField, useFormikContext } from 'formik'
import { useId } from '@reach/auto-id'
import clsx from 'clsx'

export interface FormInputProps {
  /** override the random SSR-friendly id that will be provided to the html `<input>` element */
  id?: string
  /** name of the input element (form input name) */
  name: string
  /** label/caption text */
  label: string
  /** type of html `<input>` element, default is 'text' */
  type?: 'text' | 'number' | 'email' | 'password'
  /** className to apply to the component's wrapper `<div>..</div>` element */
  className?: string
  /** autoComplete to apply to input element */
  autoComplete?: string
}

/**
 * Formik-aware Input component that renders with a label. Defaults to type 'text'.
 *
 * @todo better typed support for autoComplete (requires appropriate typing re the forwardRef) - InputHTMLAttributes<HTMLInputElement>
 */
export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ name, label, type = 'text', className, ...props }, ref) => {
    const formik = useFormikContext()

    // use the id specified via props and if not, default to assigning an SSR-friendly dynamic id courtesy of @reach/auto-id
    const id = useId(props.id)

    // field: checked, multiple, name, onblur, onchanged, value
    // helpers: setError, setTouched, setValue
    const [field, meta, helpers] = useField<string>(name)

    // on first render, set an empty string as initial value if none is specified for the component via formik initialValues
    // this behaviour enables support for dynamically generated forms
    useEffect(() => {
      if (field.value === undefined) {
        helpers.setValue('', false)
      }
    }, [])

    // in concert with the above first-render useEffect(), re-render if the fields do not have an initial value
    if (field.value === undefined) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Input named '${name}' is missing Formik initialValues`)
      }

      return null
    }

    return (
      <div
        className={clsx(className, {
          'animate-pulse': formik.isValidating || formik.isSubmitting,
        })}
      >
        <label htmlFor={id} className={'block text-sm font-medium text-gray-700'}>
          {label}
        </label>
        <div className="mt-1">
          <input
            ref={ref}
            id={id}
            type={type}
            {...props}
            {...field}
            disabled={formik.isSubmitting}
            className={clsx(
              'appearance-none block w-full border-gray-300 ',
              'rounded-md shadow-sm sm:text-sm placeholder-gray-400',
              'focus:outline-none focus:ring-green-500 focus:border-green-500',
              'disabled:opacity-50',
            )}
          />
        </div>
        {meta.error && meta.touched && <div className="mt-1 text-red-800 sm:text-sm">{meta.error}</div>}
      </div>
    )
  },
)
