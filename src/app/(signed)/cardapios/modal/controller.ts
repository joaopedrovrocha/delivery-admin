'use client'

import { Menu, WEEKDAY } from '@/app/data/menu.data'
import { useFormik } from 'formik'
import * as yup from 'yup'

export function useController() {
  const validationSchema = yup.object().shape({
    id: yup.number().required('campo obrigatório'),
    name: yup.string().required('campo obrigatório'),
    timeTable: yup.array().of(
      yup.object().shape({
        id: yup.number().required('campo obrigatório'),
        weekday: yup.string().required('campo obrigatório'),
        active: yup.boolean(),
        startTime: yup
          .string()
          .matches(/^\d{2}:\d{2}$/, 'Campo inválido. Use o formato XX:XX.')
          .when('active', {
            is: true,
            then: (schema) => schema.required('campo obrgiatório')
          }),
        endTime: yup
          .string()
          .matches(/^\d{2}:\d{2}$/, 'Campo inválido. Use o formato XX:XX.')
          .when('active', {
            is: true,
            then: (schema) => schema.required('campo obrgiatório')
          })
        ,
      })
    ).min(1, 'Informe pelo menos um produto')
  })

  const formikProperties = useFormik({
    initialValues: {
      id: 0,
      name: '',
      timeTable: [
        { id: 0, MenuId: 0, weekday: WEEKDAY.SUNDAY, active: false, startTime: '', endTime: '' },
        { id: 0, MenuId: 0, weekday: WEEKDAY.MONDAY, active: false, startTime: '', endTime: '' },
        { id: 0, MenuId: 0, weekday: WEEKDAY.TUESDAY, active: false, startTime: '', endTime: '' },
        { id: 0, MenuId: 0, weekday: WEEKDAY.WEDNESDAY, active: false, startTime: '', endTime: '' },
        { id: 0, MenuId: 0, weekday: WEEKDAY.THURSDAY, active: false, startTime: '', endTime: '' },
        { id: 0, MenuId: 0, weekday: WEEKDAY.FRIDAY, active: false, startTime: '', endTime: '' },
        { id: 0, MenuId: 0, weekday: WEEKDAY.SATURDAY, active: false, startTime: '', endTime: '' },
      ]
    } as Menu,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const valuesToSave = {
        ...values,
        timeTable: values.timeTable?.map(el => ({
          ...el,
          startTime: el.active ? el.startTime : '',
          endTime: el.active ? el.endTime : '',
        }))
      }

      console.log('Cardápio - submit', valuesToSave)
    }
  })

  return { ...formikProperties }
}