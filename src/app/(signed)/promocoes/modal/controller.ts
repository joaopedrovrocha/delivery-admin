'use client'

import { getProductsByCategory } from '@/app/data/products.data'
import { SaleProduct } from '@/app/data/sales.data'
import { formatNumber, normalizeNumber } from '@/app/utils'
import { useFormik } from 'formik'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { DateRangeType } from 'react-tailwindcss-datepicker'
import * as yup from 'yup'

export function useController() {
  const [generalDiscount, setGeneralDiscount] = useState<string>('')
  const [datepickerValue, setDatepickerValue] = useState<DateRangeType | null>(null)

  const dateFormat = useMemo(() => "DD/MM/YYYY", [])

  const validationSchema = yup.object().shape({
    name: yup.string().required('Esse campo é obrigatório'),
    products: yup.array().of(
      yup.object().shape({
        id: yup.string().required('id do produto não encontrado'),
        price: yup.string().required('informe um preço para o produto')
      })
    ).min(1, 'Informe pelo menos um produto'),
    startsAt: yup.string().required('Esse campo é obrigatório'),
    endsAt: yup.string().required('Esse campo é obrigatório'),
  })

  const formikProperties = useFormik({
    initialValues: {
      id: 0,
      name: '',
      products: [] as SaleProduct[],
      startsAt: '',
      endsAt: ''
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const valuesNormalized = values.products.map(el => {
        return {
          ...el,
          price: normalizeNumber(el.price)
        }
      })

      console.log('promoções - submit', values, valuesNormalized)
    },
  })

  function handleChangeDatepicker(datepicker: DateRangeType | null) {
    setDatepickerValue(datepicker)

    formikProperties.setValues({
      ...formikProperties.values,
      startsAt: '',
      endsAt: ''
    })

    if (datepicker?.startDate && datepicker.endDate) {
      formikProperties.setValues({
        ...formikProperties.values,
        startsAt: (datepicker.startDate as string),
        endsAt: (datepicker.endDate as string)
      })

      return
    }
  }

  function handleAddProduct(p: SaleProduct) {
    let price: string | number = '0'

    if (p.product) {
      price = formatNumber(p.product.price)
    }

    formikProperties.setValues({
      ...formikProperties.values,
      products: [...formikProperties.values.products, { ...p, price }]
    })
  }

  function handleAddProductByCategoryId(categoryId: number) {
    const products = getProductsByCategory(categoryId)

    const prods = products.map(p => ({
      id: p.id,
      price: formatNumber(p.price),
      productId: p.id,
      saleId: 0,
      product: p
    }))

    formikProperties.setValues({
      ...formikProperties.values,
      products: [...formikProperties.values.products, ...prods]
    })
  }

  function handleRemoveProduct(p: SaleProduct) {
    formikProperties.setValues({
      ...formikProperties.values,
      products: formikProperties.values.products?.filter(el => el.id !== p.id)
    })
  }

  useEffect(() => {
    let n = Number(generalDiscount)

    if (isNaN(n)) {
      return
    }

    n = n <= 100 ? n : 100

    formikProperties.setValues(values => ({
      ...values,
      products: values.products.map(el => {
        let price = normalizeNumber((el.product?.price || '0'))

        let priceWithDiscount = price - (price * n / 100)

        return {
          ...el,
          price: formatNumber(priceWithDiscount)
        }
      })
    }))
  }, [generalDiscount])

  return {
    ...formikProperties,

    generalDiscount, setGeneralDiscount,
    datepickerValue, setDatepickerValue, handleChangeDatepicker, dateFormat,

    handleAddProduct, handleRemoveProduct, handleAddProductByCategoryId
  }
}