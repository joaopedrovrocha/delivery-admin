'use client'

import { useConfirmationModal } from "@/app/contexts/confirmation-modal.context"
import { DeliveryFeeDistrict } from "@/app/data/delivery-fee.data"
import { useState } from "react"

export function useController() {
  const [deliveryFee, setDeliveryFee] = useState<DeliveryFeeDistrict | undefined>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const { handleConfirmation } = useConfirmationModal()

  function handleNew() {
    setDeliveryFee(undefined)
    setIsModalOpen(true)
  }

  function handleEdit(dfd: DeliveryFeeDistrict) {
    setDeliveryFee(dfd)
    setIsModalOpen(true)
  }

  function handleRemove(dfd: DeliveryFeeDistrict) {
    handleConfirmation({
      title: `Remover ${dfd.name}?`,
      description: 'Ao remover esse bairro não será possível utilizá-lo como parâmetro de precificação de entega.',
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