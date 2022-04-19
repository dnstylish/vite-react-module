import React from 'react'
import { IExampleProps } from './type'

export const ExampleView = ({ text }: IExampleProps) => {
  const [count, setCount] = React.useState(0)

  const inc = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <p>{text}</p>
      <button onClick={() => inc()}> Inc: {count}</button>
    </div>
  )
}
