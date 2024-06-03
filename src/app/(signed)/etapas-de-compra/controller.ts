'use client'

import { useConfirmationModal } from "@/app/contexts/confirmation-modal.context"
import { BuyingStep, BuyingStepType } from "@/app/data/buying-steps.data"
import { useState } from "react"

export function useController() {
  const [buyingStep, setBuyingStep] = useState<BuyingStep | undefined>()
  const [showModal, setShowModal] = useState<boolean>(false)

  const { handleConfirmation } = useConfirmationModal()

  function handleNew() {
    setBuyingStep(undefined)
    setShowModal(true)
  }

  function handleEdit(bs: BuyingStep) {
    setBuyingStep(bs)
    setShowModal(true)
  }

  function handleRemove(bs: BuyingStep) {
    handleConfirmation({
      title: `Remover Etapa de Compra - ${bs.name}`,
      description: `Deseja realmente remover essa etapa de compra?`,
      onConfirm: () => {
        console.log('REMOVE', bs.id)
      }
    })
  }

  function handleCloseModal() {
    setTimeout(() => setBuyingStep(undefined), 200)

    setShowModal(false)
  }

  return {
    buyingStep, setBuyingStep,

    handleNew,
    handleEdit,
    handleRemove,

    showModal, handleCloseModal,
  }
}