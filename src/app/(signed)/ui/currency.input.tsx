import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

const defaultMaskOptions = {
  prefix: '',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: '.',
  allowDecimal: true,
  decimalSymbol: ',',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 7, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
}

const CurrencyInput = ({ ...inputProps }) => {
  const currencyMask = createNumberMask(defaultMaskOptions)

  return <MaskedInput mask={currencyMask} {...inputProps} />
}

export default CurrencyInput