'use client'

import { DeliveryFeeDistance } from '@/app/data/delivery-fee.data'
import { normalizeNumber } from '@/app/utils'
import { useFormik } from 'formik'
import * as yup from 'yup'

export function useController() {
  const validationSchema = yup.object().shape({
    id: yup.number().required(''),
    from: yup.string().required('campo obrigatório'),
    to: yup.string().required('campo obrigatório'),
    price: yup.string().required('campo obrigatório'),
  })

  const formikProperties = useFormik({
    initialValues: {
      id: 0,
      price: '',
      from: 0,
      to: 0
    } as DeliveryFeeDistance,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const newValues = {
        ...values,
        price: normalizeNumber(values.price)
      }

      console.log('entrega distancia - submit', newValues)
    }
  })

  return { ...formikProperties }
}