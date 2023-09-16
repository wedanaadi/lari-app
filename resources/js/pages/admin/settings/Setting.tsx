import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

const Setting = ({ children }: Props) => {
  return (
    <>
      {children}
    </>
  )
}

export default Setting
