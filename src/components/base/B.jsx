const B = ({ value, onUpdate }) => {
  const handleChange = (e) => {
    onUpdate(e.target.value);
  };
  return (
    <div>
      <input value={value} onChange={handleChange} placeholder="B" />
    </div>
  );
};

export default B;
