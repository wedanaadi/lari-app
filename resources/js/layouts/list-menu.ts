import { BsPerson } from 'react-icons/bs';
import { HiOutlineUsers } from 'react-icons/hi2';
import { SlSettings } from 'react-icons/sl';
import { TfiDashboard } from 'react-icons/tfi';

export default [
  {
    name: "dashboard",
    icon: TfiDashboard,
    to: "/admin",
    isHasSubmenu: false,
    roles: ['su','admin','verifikator']
  },
  {
    name: "registration",
    icon: BsPerson,
    to: "/admin/registrations",
    isHasSubmenu: false,
    includeActiveTo: ['/admin/registrations/detail'],
    roles: ['su','admin','verifikator']
  },
  {
    name: "users",
    icon: HiOutlineUsers,
    to: "/admin/users",
    isHasSubmenu: true,
    border: 'none',
    roles: ['su','admin'],
    menus: [
      {
        name: "admin",
        role: ['su']
      },
      {
        name: "verifikator",
        role: ['su','admin']
      },
    ]
  },
  {
    name: "settings",
    icon: SlSettings,
    to: "/admin/settings",
    isHasSubmenu: true,
    border: 'none',
    roles: ['su','admin'],
    menus: [
      {
        name: "header",
        role: ['su']
      },
      {
        name: "categories",
        role: ['su']
      },
      {
        name: "canva",
        role: ['su']
      },
      {
        name: "sponsorship",
        role: ['su']
      },
      {
        name: "contact",
        role: ['su','admin']
      },
      {
        name: "bank",
        role: ['su','admin']
      },
      {
        name: "other_setting",
        role: ['su','admin']
      }
    ]
  },
]
