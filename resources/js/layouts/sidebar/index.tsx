import SubMenu from './SubMenu'
import React, { FC, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from "framer-motion";

// * React icons
import { IoIosArrowBack } from "react-icons/io";

// list Menu
import listMenu from '@/layouts/list-menu'
import useStore from '@/store/useStore';
import { baseLogo } from '@/lib/baseUrl';

type Props = {
  isTabletMid: boolean,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const Sidebar: FC<Props> = ({ open, setOpen, isTabletMid }) => {
  const dataLogin = useStore((state) => state.dataLogin)
  const sidebarRef = useRef<HTMLInputElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid, setOpen]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname, isTabletMid, setOpen]);

  const Nav_animation = isTabletMid
    ? {
      open: {
        x: 0,
        width: "16rem",
        transition: {
          damping: 40,
        },
      },
      closed: {
        x: -250,
        width: 0,
        transition: {
          damping: 40,
          delay: 0.15,
        },
      },
    }
    : {
      open: {
        width: "16rem",
        transition: {
          damping: 40,
        },
      },
      closed: {
        width: "4rem",
        transition: {
          damping: 40,
        },
      },
    };

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${open ? "block" : "hidden"
          }`}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-white text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem]
            overflow-hidden md:relative fixed
         h-screen"
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300 mx-3">
          <img
            src={baseLogo}
            width={45}
            alt=""
          />
          <span className="text-xl whitespace-pre">Run Event</span>
        </div>
        {/* End Logo */}

        {/* Menu */}
        <div className="flex flex-col h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1 font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100 md:h-[68%] h-[70%]">
            {listMenu.map((row, index) => {
              const {role} = dataLogin;
              if(!row.roles.includes(role)) {
                return false;
              }
              if (!row.isHasSubmenu) {
                return (
                  <li key={index}>
                    <NavLink to={row.to} className={({isActive}) => {
                      if(row.includeActiveTo?.includes(pathname) || isActive) {
                        return `link active`
                      }
                      return `link`
                    }} end>
                      <row.icon size={23} className="min-w-max" />
                      <span className='capitalize'>
                        {
                          row.name
                            .replace(/_/g, ' ')
                        }
                      </span>
                    </NavLink>
                  </li>
                )
              }
              if (row.isHasSubmenu) {
                let garis = "";
                if (row?.border === 'top') {
                  garis = 'border-t pt-2'
                } else if(row?.border === 'bottom') {
                  garis = 'border-b pb-2'
                } else {
                  garis = '';
                }
                return (
                  <div key={index}>
                    {(open || isTabletMid) && (
                      <div className={`${garis} border-slate-300`}>
                        <div key={row.name} className="flex flex-col gap-1">
                          <SubMenu data={row} />
                        </div>
                      </div>
                    )}
                  </div>
                )
              }
            }
            )}
          </ul>
          {open && (
            <div className="flex-1 text-sm z-50  max-h-48 my-auto  whitespace-pre   w-full  font-medium  ">
              {/* <div className="flex border-y border-slate-300 p-4 items-center justify-between">
                <div>
                  <p>Spark</p>
                  <small>No-cost $0/month</small>
                </div>
                <p className="text-teal-500 py-1.5 px-3 text-xs bg-teal-50 rounded-xl">
                  Upgrade
                </p>
              </div> */}
            </div>
          )}
        </div>
        {/* End Menu */}

        {/* minimaze  */}
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                x: 0,
                y: 0,
                rotate: 0,
              }
              : {
                x: -10,
                y: -200,
                rotate: 180,
              }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      {/* <div className="m-3 md:hidden" onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div> */}
    </>
  )
}

export default Sidebar
