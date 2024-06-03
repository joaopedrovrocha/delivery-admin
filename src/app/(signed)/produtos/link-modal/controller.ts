'use client'

import { BuyingStep } from "@/data/buying-steps.data"
import { Product, ProductBuyingStep, getProductsMounted } from "@/data/products.data"
import { useFormik } from "formik"
import { useState } from "react"
import * as yup from 'yup'

export function useModalController() {
  const validationSchema = yup.object().shape({
    id: yup.number().required('campo obrigatório'),
    buyingSteps: yup.array().of(
      yup.object().shape({
        buyingStepId: yup.number().required('campo obrigatório'),
      })
    ).min(1, 'Informe pelo menos uma Etapa de Compra')
  })

  const formikProperties = useFormik({
    initialValues: {
      id: 0,
      buyingSteps: [] as ProductBuyingStep[]
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log('link etapa de compra - submit', values)
    }
  })

  function handleCopyFromProduct(p: Product) {
    let order = formikProperties.values.buyingSteps.length + 1

    const bs = p.buyingSteps?.map(el => ({ ...el, productId: formikProperties.values.id, order: order++ })) || []

    formikProperties.setValues({
      ...formikProperties.values,
      buyingSteps: [
        ...formikProperties.values.buyingSteps,
        ...bs
      ]
    })
  }

  function handleAddBuyingStep(bs: BuyingStep) {
    formikProperties.setValues({
      ...formikProperties.values,
      buyingSteps: [
        ...formikProperties.values.buyingSteps,
        { productId: formikProperties.values.id, buyingStep: bs, id: 0, buyingStepId: bs.id, order: formikProperties.values.buyingSteps.length + 1 }
      ]
    })
  }

  function handleRemoveBuyingStep(bsId: number) {
    let order = 1

    formikProperties.setValues({
      ...formikProperties.values,
      buyingSteps: formikProperties
        .values
        .buyingSteps
        ?.filter(el => el.id !== bsId)
        .map(el => ({
          ...el,
          order: order++
        }))
    })
  }

  function handleMoveUp(pbs: ProductBuyingStep) {
    const orderToMoveDown = pbs.order - 1

    formikProperties.setValues({
      ...formikProperties.values,
      buyingSteps: formikProperties.values.buyingSteps?.map(el => ({
        ...el,
        order: (el.order === orderToMoveDown) ? el.order + 1 : ((el.id === pbs.id) ? el.order - 1 : el.order)
      }))
    })
  }

  function handleMoveDown(pbs: ProductBuyingStep) {
    const orderToMoveUp = pbs.order + 1

    formikProperties.setValues({
      ...formikProperties.values,
      buyingSteps: formikProperties.values.buyingSteps?.map(el => ({
        ...el,
        order: (el.order === orderToMoveUp) ? el.order - 1 : ((el.id === pbs.id) ? el.order + 1 : el.order)
      }))
    })
  }

  return {
    ...formikProperties,

    handleAddBuyingStep, handleRemoveBuyingStep, handleCopyFromProduct, handleMoveDown, handleMoveUp
  }
}