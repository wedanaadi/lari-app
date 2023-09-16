import { FC, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { IoIosArrowDown } from 'react-icons/io'
import { IconType } from "react-icons";
import { motion } from 'framer-motion'
import useStore from '@/store/useStore';

type subMenu = {
  name: string,
  role: string[]
}

type data = {
  to: string,
  name: string,
  icon: IconType,
  menus?: subMenu[]
}

interface Props {
  data: data
}

const SubMenu: FC<Props> = ({ data }) => {
  const dataLogin = useStore((state) => state.dataLogin)
  const { pathname } = useLocation()
  const [subMenuOpen, setSubMenuOpen] = useState<boolean>(false)

  return (
    <>
      <li
        className={`link ${pathname.includes(data.name) && "text-primary"}`}
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        <data.icon size={23} className="min-w-max" />
        <p className="flex-1 capitalize">{data.name}</p>
        <IoIosArrowDown
          className={`${subMenuOpen && "rotate-180"} duration-200`}
        />
      </li>
      <motion.ul
        animate={
          subMenuOpen
            ? {
              height: "fit-content",
            }
            : {
              height: 0,
            }
        }
        className="flex h-0 flex-col pl-14 text-[0.8rem] font-normal overflow-hidden"
      >
        {data.menus?.sort((a, b) => {
          return a.name.localeCompare(b.name);
        }).map((menu, index) => {
          const { role } = dataLogin;
          if (!menu.role.includes(role)) {
            return false;
          }
          return (
            <li key={index}>
              {/* className="hover:text-blue-600 hover:font-medium" */}
              <NavLink
                to={`${data.to}/${menu.name.replace(/_/g, "-")}`}
                className="link !bg-transparent capitalize"
              >
                {menu.name.replace(/_/g, " ")}
              </NavLink>
            </li>
          );
        })}
      </motion.ul>
    </>
  )
}

export default SubMenu
