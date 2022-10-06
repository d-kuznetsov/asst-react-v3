import { useState } from "react";
import { createContext } from "./../utils";
import Step from "./Step";
import { useAsstContext } from "./../context";

const Assistent = ({ config }) => {
  const { asstState } = useAsstContext();
  const stepConfig = config.steps.find(
    ({ id }) => asstState.currentStepId === id
  );
  return (
    <div>
      <div>{asstState.currentStepId}</div>
      <div>
        <Step config={stepConfig} />
      </div>
    </div>
  );
};

export default Assistent;
