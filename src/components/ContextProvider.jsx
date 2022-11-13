import { useMemo } from "react";
import { AsstContext, useAsstReducer } from "../context";

const ContextProvider = ({ children, config }) => {
  const [state, dispatch] = useAsstReducer(config);
  
  const value = useMemo(
    () => ({
      asstState: state,
      dispatch,
    }),
    [state, dispatch]
  );
  return <AsstContext.Provider value={value}>{children}</AsstContext.Provider>;
};

export default ContextProvider;
