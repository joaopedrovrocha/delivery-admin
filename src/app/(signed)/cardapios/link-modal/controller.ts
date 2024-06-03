'use client'

import { Category } from '@/data/categories.data'
import { Product, getProductsByCategory } from '@/data/products.data'
import { Sale } from '@/data/sales.data'
import { useFormik } from 'formik'
import { v4 } from 'uuid'
import * as yup from 'yup'

export interface Section {
  id: string
  name: string
  products: SectionProduct[]
  active: boolean
}

export interface SectionProduct {
  id: string
  sectionId: string
  section?: Section
  product: Product
  price: number | string
  priceDetail: string
}

export function useController() {
  const validationSchema = yup.object().shape({
    sections: yup.array().of(
      yup.object().shape({
        name: yup.string().required('campo obrigatório'),
      })
    ).min(1, 'Informe pelo menos uma seção')
  })

  const formikProperties = useFormik({
    initialValues: {
      sections: [] as Section[]
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log('Cardápio seções - submit', values)
    }
  })

  function handleAddSection() {
    formikProperties.setValues({
      sections: [
        ...formikProperties.values.sections.map(el => ({ ...el, active: false })),
        { id: v4(), name: `<Nome da Seção>`, products: [], active: true }
      ]
    })
  }

  function handleRemoveSection(s: Section) {
    const firstSection = formikProperties.values.sections.filter(el => el.id !== s.id)[0]

    formikProperties.setValues({
      sections: [
        ...formikProperties.values.sections
          .filter(el => el.id !== s.id)
          .map(el => ({ ...el, active: firstSection ? (el.id === firstSection.id ? true : false) : false }))
      ]
    })
  }

  function handleSetCurrent(s: Section) {
    formikProperties.setValues({
      sections: [
        ...formikProperties.values.sections.map(el => ({ ...el, active: s.id === el.id }))
      ]
    })
  }

  function handleAddProduct(s: Section, p: Product) {
    const prod: SectionProduct = {
      id: v4(),
      sectionId: s.id,
      product: p,
      price: p.price,
      priceDetail: `PRODUCT:${p.id}`
    }

    formikProperties.setValues({
      sections: [
        ...formikProperties
          .values
          .sections
          .map((el: Section) => ({
            ...el,
            products: s.id === el.id ? [...el.products || [], prod] : el.products
          }))
      ]
    })
  }

  function handleRemoveProduct(sp: SectionProduct) {
    formikProperties.setValues({
      sections: [
        ...formikProperties.values.sections
          .map(el => ({
            ...el,
            products: el.id !== sp.sectionId ? el.products : el.products.filter(p => p.id !== sp.id)
          }))
      ]
    })
  }

  function handleAddProductByCategory(s: Section, c: Category) {
    const prods = getProductsByCategory(c.id).map(p => ({
      id: v4(),
      sectionId: s.id,
      product: p,
      price: p.price,
      priceDetail: `PRODUCT:${p.id}`
    }))

    formikProperties.setValues({
      sections: [
        ...formikProperties
          .values
          .sections
          .map((el: Section) => ({
            ...el,
            products: s.id === el.id ? [...el.products, ...prods] : el.products
          }))
      ]
    })
  }

  function handleAddProductBySale(s: Section, sale: Sale) {
    const prods = sale.products?.map(sp => ({
      id: v4(),
      sectionId: s.id,
      product: sp.product as Product,
      price: sp.price,
      priceDetail: `SALEPRODUCT:${sp.id}`
    }))

    formikProperties.setValues({
      sections: [
        ...formikProperties
          .values
          .sections
          .map((el: Section) => ({
            ...el,
            products: s.id === el.id ? [...el.products, ...prods || []] : el.products
          }))
      ]
    })
  }

  return {
    ...formikProperties,
    handleAddSection, handleRemoveSection, handleSetCurrent,
    handleAddProduct, handleRemoveProduct, handleAddProductByCategory, handleAddProductBySale,
  }
}