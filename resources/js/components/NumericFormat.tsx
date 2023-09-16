import { FC } from 'react'
import { NumericFormat as NF } from 'react-number-format'

type NumericFormatProps = {
  value: number,
  decimalScale?: number,
  thousandSeparator?: string,
  decimalSeparator?: string
}
const NumericFormat: FC<NumericFormatProps> = ({ value, decimalScale = 0, thousandSeparator = ".", decimalSeparator = "," }) => {
  return (
    <NF
      displayType="text"
      value={value}
      thousandSeparator={thousandSeparator}
      decimalSeparator={decimalSeparator}
      allowNegative={false}
      decimalScale={decimalScale}
    />
  )
}

export default NumericFormat
