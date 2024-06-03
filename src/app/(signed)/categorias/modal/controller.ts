'use client'

import { useFormik } from 'formik'
import * as yup from 'yup'

export function useController() {
  const validationSchema = yup.object().shape({
    name: yup.string().required('campo obrigatório')
  })

  const formikProperties = useFormik({
    initialValues: {
      id: 0,
      name: ''
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      console.log('values', values)
    }
  })

  return { ...formikProperties }
}