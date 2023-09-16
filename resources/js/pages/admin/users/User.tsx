import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

const Users = ({ children }: Props) => {
  return (
    <>
      {children}
    </>
  )
}

export default Users
