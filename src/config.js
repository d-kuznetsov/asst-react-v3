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
          validate: (value) => {
            const result = value === "aaa" ? true : false
            console.log('validate', result);
            return result;
          }
        },
        {
          id: "F1B",
          title: "B field",
          type: "CB",
          validate: (value) => {
            const result = value === "bbb" ? true : false
            console.log('validate', result);
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
