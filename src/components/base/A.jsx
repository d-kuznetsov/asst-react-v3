const A = ({ value, onUpdate }) => {
  const handleChange = (e) => {
    onUpdate(e.target.value);
  };
  return (
    <div>
      <input value={value} onChange={handleChange} placeholder="A" />
    </div>
  );
};

export default A;
