import { useState } from 'react'
import { createContext } from './../utils'
import Step from './Step'

const Assistent = ({config}) => {
  const ctx = createContext(config)
  const [currentStateId, setCurrentStateId] = useState(ctx.startStepId)
  const handleStateChange = () => {
    debugger
    setCurrentStateId(ctx.steps[ctx.startStepId].next())
  }

  return <div>
    <div>{ctx.steps[currentStateId].title}</div>
    <Step config={ctx.steps[currentStateId]} onNext={handleStateChange}/>
  </div>
}

export default Assistent;