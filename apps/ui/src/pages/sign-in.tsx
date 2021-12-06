import { useCallback } from 'react'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import * as Yup from 'yup'

import { useIsMountedRef } from '@fx-nx-stack/react/hooks'

import { Logo } from '../components/brand/Logo'
import { FormInput } from '../components/inputs/formik/FormInput'
import { signIn } from '../backend'
import { useRouter } from 'next/dist/client/router'

export interface SignInFormValues {
  email: string
  password: string
}

const initialValues: SignInFormValues = {
  email: '',
  password: '',
}

const validationSchema = Yup.object({
  email: Yup.string().required('Email is required').email('Email invalid'),
  password: Yup.string().required('Password is required'),
})

export function SignInPage() {
  const router = useRouter()
  const isMountedRef = useIsMountedRef()

  const handleSignInSuccess = useCallback(() => {
    router.push('/')
  }, [])

  const handleSubmit = useCallback(async (values: SignInFormValues, formikHelpers: FormikHelpers<SignInFormValues>) => {
    try {
      await signIn(values.email, values.password)

      if (isMountedRef.current) {
        formikHelpers.setStatus({
          success: true,
          error: null,
        })

        // if (typeof onSignInSuccess === 'function') {
        //   onSignInSuccess()
        // }

        handleSignInSuccess()
      }
    } catch (error) {
      if (isMountedRef.current) {
        formikHelpers.setStatus({
          success: false,
          error: (error && error instanceof Error && error.message) || String(error),
        })
      }
    }
  }, [])

  const handlePasswordReset = () => {
    alert('@todo - Password reset functionality')
  }

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Logo className="mx-auto h-14 w-auto text-green-600" />
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10 bg-gray-100 border-2">
            <h2 className="mb-4 text-center text-2xl font-extrabold text-gray-700">Sign in</h2>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
              {(formikProps: FormikProps<SignInFormValues>) => (
                <Form noValidate autoComplete="off" className="space-y-4">
                  <FormInput name="email" type="email" label="Email address" />
                  <FormInput name="password" type="password" label="Password" />
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Sign in
                    </button>
                  </div>
                  <div className="flex justify-center items-center pt-1">
                    <div className="text-sm">
                      <span
                        onClick={handlePasswordReset}
                        className="cursor-pointer font-medium text-green-600 hover:text-green-500"
                      >
                        Reset Password
                      </span>
                    </div>
                  </div>

                  <div className="mt-2">
                    {formikProps.status?.error && (
                      <div className="mt-4 text-red-800">Error: {formikProps.status?.error}</div>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignInPage
