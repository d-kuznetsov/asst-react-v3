const Step = ({ config, onNext }) => {
  return (
    <div>
      <div>step</div>
      <div>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default Step;
