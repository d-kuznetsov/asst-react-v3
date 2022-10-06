import A from './base/A'
import B from './base/B'

const Field = ({type}) => {
  switch(type) {
    case "CA":
      return <A />
    case "CB":
      return <B />
    default:
      return <span>Unknown component</span>
  }
}

const Step = ({ config, onNext }) => {
  return (
    <div>
      <div>{config.title}</div>
      <div>
        {config.fields.map((field) => {
          return <div key={field.id}>
            <Field type={field.type}/>
          </div>
        })}
      </div>
      <div>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default Step;
