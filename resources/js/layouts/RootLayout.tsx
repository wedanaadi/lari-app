import { ReactNode, useState } from "react";
import Sidebar from "./sidebar";
import Menubar from "./Menubar";
import { useMediaQuery } from "react-responsive";

interface Props {
  children: ReactNode
}

function RootLayout({ children }: Props) {
  const isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState<boolean>(isTabletMid ? false : true)
  return (
    <div className="flex max-h-screen">
      <Sidebar open={open} setOpen={setOpen} isTabletMid={isTabletMid} />
      <div className="flex-row overflow-y-auto w-full scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-400">
        <Menubar setOpen={setOpen} />
        <main className="m-4 flex-1 min-h-screen">{children}</main>
      </div>
    </div>
  );
}

export default RootLayout
