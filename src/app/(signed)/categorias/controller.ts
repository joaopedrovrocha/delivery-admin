'use client'

import { useConfirmationModal } from "@/app/contexts/confirmation-modal.context"
import { Category } from "@/app/data/categories.data"
import { useState } from "react"

export const useCategoriesController = () => {
  const [category, setCategory] = useState<Category | undefined>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const { handleConfirmation } = useConfirmationModal()

  function handleNew() {
    setCategory(undefined)
    setIsModalOpen(true)
  }

  function handleEdit(c: Category) {
    setCategory(c)
    setIsModalOpen(true)
  }

  function handleRemove(c: Category) {
    handleConfirmation({
      title: `Remover Categoria - ${c.name}`,
      description: 'Deseja realmente remover essa categoria?',
      onConfirm: () => {
        console.log('REMOVE', c.id)
      }
    })
  }

  function handleCloseModal() {
    setTimeout(() => setCategory(undefined), 200)
    setIsModalOpen(false)
  }

  return {
    category, setCategory,
    handleNew, handleEdit, handleRemove,

    isModalOpen, handleCloseModal
  }
}