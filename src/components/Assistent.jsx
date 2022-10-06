import { createContext } from './../utils'

const Assistent = ({config}) => {
  const ctx = createContext(config)
  return <div>{ctx.currentStepId}</div>
}

export default Assistent;