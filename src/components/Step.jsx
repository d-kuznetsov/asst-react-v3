import A from "./base/A";
import B from "./base/B";
import { useAsstContext } from "./../context";

const Field = ({ type }) => {
  switch (type) {
    case "CA":
      return <A />;
    case "CB":
      return <B />;
    default:
      return <span>Unknown component</span>;
  }
};

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
        {config.fields.map((field) => {
          return (
            <div key={field.id}>
              <Field type={field.type} />
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
