import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

const defaultMaskOptions = {
  prefix: '',
  suffix: '',
  includeThousandsSeparator: false,
  thousandsSeparatorSymbol: '',
  allowDecimal: false,
  decimalSymbol: ':',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 4, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
}

const TimeInput = ({ ...inputProps }) => {
  const currencyMask = createNumberMask(defaultMaskOptions)

  return <MaskedInput mask={currencyMask} {...inputProps} />
}

export default TimeInput