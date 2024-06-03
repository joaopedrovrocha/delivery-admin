'use client'

import { useConfirmationModal } from "@/contexts/confirmation-modal.context"
import { Sale } from "@/data/sales.data"
import { useState } from "react"

export function useController() {
  const [sale, setSale] = useState<Sale | undefined>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const { handleConfirmation } = useConfirmationModal()

  function handleCloseModal() {
    setTimeout(() => setSale(undefined), 200)
    setIsModalOpen(false)
  }

  function handleNew() {
    setSale(undefined)
    setIsModalOpen(true)
  }

  function handleEdit(s: Sale) {
    setSale(s)
    setIsModalOpen(true)
  }

  function handleRemove(s: Sale) {
    handleConfirmation({
      title: `Remover ${s.name}?`,
      description: 'Ao remover uma promoção ela deixará de ser apresentada no cardápio do e-commerce caso esteja relacionada a uma.',
      onConfirm: () => {
        console.log('REMOVE', s)
      }
    })
  }

  return {
    isModalOpen, handleCloseModal,
    sale, setSale,

    handleNew, handleEdit, handleRemove
  }
}