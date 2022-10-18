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
          validate: (value, parentHash) => {
            let error = null;
            if (value === "aaa") {
              error = "This field must not contaion 'aaa'"
            } else if (parentHash.F1B === "ccc") {
              error = "The next field must not contaion 'ccc'"
            }
            return error;
          }
        },
        {
          id: "F1B",
          title: "B field",
          type: "CB",
          validate: (value) => {
            return value === "bbb" ? "This field must not contaion 'bbb'" : null;
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
              validate: (value) => {
                return value === "aaa" ? "This field must not contaion 'aaa'" : null;
              }
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
