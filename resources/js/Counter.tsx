import React, { FC, useState } from 'react'

type Props = {
  title: string,
  counter: number,
  setCounter: React.Dispatch<React.SetStateAction<number>>,
  children: React.ReactNode
}

export const Counter: FC<Props> = ({ title, counter, setCounter, children }) => {
  const [text,setText] = useState<string>("")

  const HandleText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  return (
    <div>
      <h1>{title}</h1>
      <h1>{counter}</h1>
      <button onClick={() => {
        setCounter(counter + 1);
        console.log("render");
      }
      }>+</button>
      <hr />
      {children}
      <hr />
      <input type="text" onChange={HandleText} />
      {text}
    </div>
  )
}
