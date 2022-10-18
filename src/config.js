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
          validate: (value, parentContext) => {
            const result1 = value === "aaa";
            const result2 = parentContext.F1B === "ccc";
            return result1 && result2;;
          }
        },
        {
          id: "F1B",
          title: "B field",
          type: "CB",
          validate: (value) => {
            const result = value === "bbb"
            return result;
          }
        },
        {
          id: "F1C",
          title: "C field",
          type: "CF",
          fields: [
            {
              id: "F1CA",
              title: "A subfield",
              type: "CA",
            },
            {
              id: "F1CB",
              title: "B subfield",
              type: "CB",
            },
          ],
        },
      ],
      next: () => {
        return "S2";
      },
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
