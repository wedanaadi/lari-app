import { TCanvaSheme } from "@/lib/types"

interface IInframeProps {
  data: TCanvaSheme
}

export default function Tutorial({data}:IInframeProps) {
  return (
    <>
      <div id="canva-container" dangerouslySetInnerHTML={{ __html: data.canva_inframe }}></div>
    </>
  )
}
