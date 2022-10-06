export default {
  steps: [
    {
      id: "S1",
      title: "First step",
      fields: [
        {
          id: "F1A",
          title: "A field",
          type: "CA",
        },
        {
          id: "F1B",
          title: "B field",
          type: "CB",
        },
      ],
      next: () => {
        return "S2"
      }
    },
    {
      id: "S2",
      title: "Second step",
      fields: [
        {
          id: "F1C",
          title: "C field",
          type: "CA",
        },
        {
          id: "F1D",
          title: "D field",
          type: "CB",
        },
      ],
    },
  ],
};
