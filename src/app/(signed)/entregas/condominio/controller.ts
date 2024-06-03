'use client'

import { useConfirmationModal } from "@/contexts/confirmation-modal.context"
import { DeliveryFeeCondo } from "@/data/delivery-fee.data"
import { useState } from "react"

export function useController() {
  const [deliveryFee, setDeliveryFee] = useState<DeliveryFeeCondo | undefined>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const { handleConfirmation } = useConfirmationModal()

  function handleNew() {
    setDeliveryFee(undefined)
    setIsModalOpen(true)
  }

  function handleEdit(dfd: DeliveryFeeCondo) {
    setDeliveryFee(dfd)
    setIsModalOpen(true)
  }

  function handleRemove(dfc: DeliveryFeeCondo) {
    handleConfirmation({
      title: `Remover ${dfc.name}?`,
      description: 'Ao remover esse condomínio não será possível utilizá-lo como parâmetro de precificação de entega.',
      onConfirm: () => {
        console.log('REMOVE', dfc)
      }
    })
  }

  function handleCloseModal() {
    setTimeout(() => setDeliveryFee(undefined), 200)
    setIsModalOpen(false)
  }

  return {
    isModalOpen, handleCloseModal,
    deliveryFee,
    handleNew, handleEdit, handleRemove
  }
}