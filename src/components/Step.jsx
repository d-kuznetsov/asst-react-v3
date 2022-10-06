import Field from './Field'
import { useAsstContext } from "./../context";


const Step = ({ config }) => {
  const { dispatch } = useAsstContext();
  const handleNext = () => {
    const nextStepId = config.next();
    dispatch({
      type: "SET_CURRENT_STEP_ID",
      currentStepId: nextStepId,
    });
  };
  return (
    <div>
      <div>{config.title}</div>
      <div>
        {config.fields.map((fieldConfig) => {
          return (
            <div key={fieldConfig.id}>
              <Field config={fieldConfig} parentId={config.id}/>
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Step;
