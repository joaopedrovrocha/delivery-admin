'use client'

import { BuyingStepType, VirtualProduct } from '@/data/buying-steps.data'
import { Product, getProductsByCategory } from '@/data/products.data'
import { formatNumber, normalizeNumber } from '@/utils'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import * as yup from 'yup'

export function useVirtualModalController() {
  const [productNamePrefix, setProductNamePrefix] = useState<string>('')
  const [productPriceDiscount, setProductPriceDiscount] = useState<string>('')

  const validationSchema = yup.object().shape({
    name: yup.string().required('Esse campo é obrigatório'),
    products: yup.array().of(
      yup.object().shape({
        name: yup.string().required('compo obrigatório'),
        description: yup.string(),
        price: yup
          .string()
          .matches(/^\d{1,},\d{2}$/, 'Utilize o formato 0000,00.')
          .required('compo obrigatório')
      })
    ).min(1, 'Informe pelo menos um produto')
  })

  const formikProperties = useFormik({
    initialValues: {
      id: 0,
      name: '',
      type: BuyingStepType.VIRTUAL,
      products: [] as VirtualProduct[]
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const valuesNormalized = values.products.map(el => ({
        ...el,
        price: normalizeNumber(el.price)
      }))

      console.log('etapa de compra submit', valuesNormalized)
    },
  })

  function handleAddProduct(p: Product) {
    const vp: VirtualProduct = {
      id: v4(),
      name: p.name,
      nameBkp: p.name,
      description: p.description,
      price: formatNumber(p.price),
      priceBkp: formatNumber(p.price)
    }

    formikProperties.setValues({
      ...formikProperties.values,
      products: [...formikProperties.values.products, vp]
    })
  }

  function handleAddProductByCategoryId(categoryId: number) {
    const products = getProductsByCategory(categoryId)

    formikProperties.setValues({
      ...formikProperties.values,
      products: [...formikProperties.values.products, ...products.map(p => ({
        id: v4(),
        name: p.name,
        nameBkp: p.name,
        description: p.description,
        price: formatNumber(p.price),
        priceBkp: formatNumber(p.price)
      }))]
    })
  }

  function handleAddLooseProduct() {
    const vp: VirtualProduct = {
      id: v4(),
      name: '',
      description: '',
      price: formatNumber('0.0')
    }

    formikProperties.setValues({
      ...formikProperties.values,
      products: [...formikProperties.values.products, vp]
    })
  }

  function handleRemoveProduct(vp: VirtualProduct) {
    formikProperties.setValues({
      ...formikProperties.values,
      products: formikProperties.values.products?.filter(el => el.id !== vp.id)
    })
  }

  useEffect(() => {
    formikProperties.setValues(values => ({
      ...values,
      products: values.products.map(el => ({
        ...el,
        name: `${productNamePrefix} ${el.nameBkp}`
      }))
    }))
  }, [productNamePrefix])

  useEffect(() => {
    let n = Number(productPriceDiscount)

    if (isNaN(n)) {
      return
    }

    n = n <= 100 ? n : 100

    formikProperties.setValues(values => ({
      ...values,
      products: values.products.map(el => {
        let price = normalizeNumber((el.priceBkp || '0'))

        let priceWithDiscount = (price - (price * n / 100)).toFixed(2)

        return {
          ...el,
          price: formatNumber(priceWithDiscount)
        }
      })
    }))
  }, [productPriceDiscount])

  return {
    ...formikProperties,

    productNamePrefix, setProductNamePrefix,
    productPriceDiscount, setProductPriceDiscount,

    handleAddLooseProduct, handleRemoveProduct, handleAddProduct, handleAddProductByCategoryId
  }
}