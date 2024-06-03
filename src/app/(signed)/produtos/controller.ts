'use client'

import { useConfirmationModal } from "@/app/contexts/confirmation-modal.context"
import { Product } from "@/app/data/products.data"
import { useState } from "react"

export function useController() {
  const [product, setProduct] = useState<Product | undefined>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isBSModalOpen, setIsBSModalOpen] = useState<boolean>(false)

  const { handleConfirmation } = useConfirmationModal()

  function handleCloseModal() {
    setTimeout(() => setProduct(undefined), 200)
    setIsModalOpen(false)
  }

  function handleCloseLinkModal() {
    setTimeout(() => setProduct(undefined), 200)
    setIsBSModalOpen(false)
  }

  function handleNew() {
    setProduct(undefined)
    setIsModalOpen(true)
  }

  function handleEdit(p: Product) {
    setProduct(p)
    setIsModalOpen(true)
  }

  function handleRemove(p: Product) {
    handleConfirmation({
      title: `Remover ${p.name} ?`,
      description: `Ao remover o produto ele ficará de fora da listagem de produtos do e-commerce mesmo que esteja relacionado a um cardápio.`,
      onConfirm: () => {
        console.log('REMOVE', p)
      }
    })

  }

  function handleLink(p: Product) {
    setProduct(p)
    setIsBSModalOpen(true)
  }

  return {
    isModalOpen, handleCloseModal,
    isBSModalOpen, handleCloseLinkModal,
    product,
    handleNew, handleEdit, handleRemove, handleLink,
  }
}