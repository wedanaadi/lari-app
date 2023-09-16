import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

const Index = ({ children }: Props) => {
  return (
    <>
      {children}
    </>
  )
}

export default Index
