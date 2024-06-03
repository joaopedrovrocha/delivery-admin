'use client'

import { login } from '@/app/auth/login/actions'
import { useUser } from '@/app/hooks/user.hook'
import { useFormik } from 'formik'
import { RedirectType, redirect } from 'next/navigation'
import * as yup from 'yup'

export function useLoginController() {
  const { setAuthUser } = useUser()

  const validationSchema = yup.object().shape({
    username: yup.string().required('Usuário é obrigatório'),
    password: yup.string().required('Senha é obrigatório')
  })

  const formikProperties = useFormik({
    initialValues: { username: '', password: '' },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      const response = await login(values)

      console.log('response', response)

      if (response.success) {
        setAuthUser({
          token: 'XPTO',
          user: {
            name: 'João Pedro Rocha',
            username: 'joaopedrovrocha'
          },
          platform: {
            name: 'McDonalds',
            uf: 'MG',
            logo: 'https://w7.pngwing.com/pngs/676/74/png-transparent-fast-food-mcdonald-s-logo-golden-arches-restaurant-mcdonalds-mcdonald-s-logo-miscellaneous-food-company.png'
          }
        })

        setTimeout(() => {
          window.location.reload()
        }, 300)
      }
    }
  })

  return { ...formikProperties }
}