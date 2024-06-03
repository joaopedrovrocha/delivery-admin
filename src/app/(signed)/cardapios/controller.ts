'use client'

import { useConfirmationModal } from "@/contexts/confirmation-modal.context"
import { Menu, getMenuMounted } from "@/data/menu.data"
import { useMemo, useState } from "react"

export function useController() {
  const [menu, setMenu] = useState<Menu | undefined>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isLinkModalOpen, setIsLinkModalOpen] = useState<boolean>(false)

  const allMenu = useMemo(() => getMenuMounted(), [])

  const { handleConfirmation } = useConfirmationModal()

  function handleCloseModal() {
    setTimeout(() => setMenu(undefined), 200)
    setIsModalOpen(false)
    setIsLinkModalOpen(false)
  }

  function handleNew() {
    setMenu(undefined)
    setIsModalOpen(true)
  }

  function handleEdit(m: Menu) {
    setMenu(m)
    setIsModalOpen(true)
  }

  function handleLinkProducts(m: Menu) {
    setMenu(m)
    setIsLinkModalOpen(true)
  }

  function handleRemove(m: Menu) {
    handleConfirmation({
      title: `Remover ${m.name}?`,
      description: `Ao remover um Cardápio os produtos relacionados à ele não serão mais listados no e-commerce.`,
      onConfirm: () => {
        console.log('REMOVE', m)
      }
    })
  }

  return {
    isModalOpen, isLinkModalOpen, handleCloseModal,
    menu, allMenu,
    handleNew, handleEdit, handleRemove, handleLinkProducts,
  }
}