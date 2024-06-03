import { WEEKDAY } from "../data/menu.data"

export function formatNumber(n: string | number) {
  n = (typeof n === 'string') ? parseFloat(n) : n

  return new Intl.NumberFormat('pt-br', { minimumFractionDigits: 2 }).format(n)
}

export function formatKilometer(n: string | number) {
  n = (typeof n === 'string') ? parseFloat(n) : n

  return new Intl.NumberFormat('pt-br', { minimumFractionDigits: 3 }).format(n)
}

export function normalizeNumber(n: string | number) {
  return typeof n === "number"
    ? n
    : Number(n.toString().replace(/\./, '').replace(/,/, '.'))
}

const weekdays = {
  [WEEKDAY.SUNDAY]: {
    full: 'Domingo',
    short: 'Dom'
  },
  [WEEKDAY.MONDAY]: {
    full: 'Segunda-Feira',
    short: 'Seg'
  },
  [WEEKDAY.TUESDAY]: {
    full: 'Terça-Feira',
    short: 'Ter'
  },
  [WEEKDAY.WEDNESDAY]: {
    full: 'Quarta-Feira',
    short: 'Qua'
  },
  [WEEKDAY.THURSDAY]: {
    full: 'Quinta-Feira',
    short: 'Qui'
  },
  [WEEKDAY.FRIDAY]: {
    full: 'Sexta-Feira',
    short: 'Sex'
  },
  [WEEKDAY.SATURDAY]: {
    full: 'Sábado',
    short: 'Sáb'
  },
}

export function normalizeWeekday(weekday: WEEKDAY, type: 'full' | 'short') {
  return weekdays[weekday][type]
}

export function normalizeStringToSearch(s: string) {
  return s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}