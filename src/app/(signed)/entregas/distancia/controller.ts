'use client'

import { useConfirmationModal } from "@/contexts/confirmation-modal.context"
import { DeliveryFeeDistance } from "@/data/delivery-fee.data"
import { formatKilometer } from "@/utils"
import { useState } from "react"

export function useController() {
  const [deliveryFee, setDeliveryFee] = useState<DeliveryFeeDistance | undefined>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const { handleConfirmation } = useConfirmationModal()

  function handleNew() {
    setDeliveryFee(undefined)
    setIsModalOpen(true)
  }

  function handleEdit(dfd: DeliveryFeeDistance) {
    setDeliveryFee(dfd)
    setIsModalOpen(true)
  }

  function handleRemove(dfd: DeliveryFeeDistance) {
    handleConfirmation({
      title: `Remover ${formatKilometer(dfd.from)} até ${formatKilometer(dfd.to)}?`,
      description: 'Ao remover esse condomínio não será possível utilizá-lo como parâmetro de precificação de entega.',
      onConfirm: () => {
        console.log('REMOVE', dfd)
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