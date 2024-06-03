'use client'

import { Product } from '@/data/products.data'
import { normalizeNumber } from '@/utils'
import { useFormik } from 'formik'
import * as yup from 'yup'

export function useController() {
  const validationSchema = yup.object().shape({
    id: yup.number().required(''),
    name: yup.string().required('campo obrigatório'),
    description: yup.string(),
    price: yup.string().required('campo obrigatório'),
    categoryId: yup.number().required('campo obrigatório').moreThan(0),
    imageUrl: yup.string().required('campo obrigatório'),
  })

  const formikProperties = useFormik({
    initialValues: {
      id: 0,
      name: '',
      description: '',
      categoryId: 0,
      price: '',
      imageUrl: ''
    } as Product,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      values.price = normalizeNumber(values.price)

      console.log('produto - submit', values)
    }
  })

  return { ...formikProperties }
}