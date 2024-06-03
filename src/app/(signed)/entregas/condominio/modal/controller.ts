'use client'

import { DeliveryFeeCondo } from '@/data/delivery-fee.data'
import { normalizeNumber } from '@/utils'
import { useFormik } from 'formik'
import * as yup from 'yup'

export function useController() {
  const validationSchema = yup.object().shape({
    id: yup.number().required(''),
    name: yup.string().required('campo obrigatório'),
    latLongFrom: yup.string().required('campo obrigatório'),
    latLongTo: yup.string().required('campo obrigatório'),
    price: yup.string().required('campo obrigatório'),
  })

  const formikProperties = useFormik({
    initialValues: {
      id: 0,
      name: '',
      latLongFrom: '',
      latLongTo: '',
      price: '',
    } as DeliveryFeeCondo,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const newValues = {
        ...values,
        price: normalizeNumber(values.price)
      }

      console.log('entrega condominio - submit', newValues)
    }
  })

  return { ...formikProperties }
}