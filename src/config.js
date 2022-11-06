import { FIELD_TYPES } from './field-types'

export default {
  steps: [
    {
      id: "S1",
      title: "First step",
      fields: [
        {
          id: "F1A",
          title: "A field",
          type: FIELD_TYPES.TEXT,
          validate: (value, parentHash) => {
            let error = null;
            if (value === "aaa") {
              error = "This field must not contaion 'aaa'";
            } else if (parentHash.F1B === "ccc") {
              error = "The next field must not contaion 'ccc'";
            }
            return error;
          },
          required: true,
        },
        {
          id: "F1B",
          title: "B field",
          type: FIELD_TYPES.CHECKBOX,
          hide: (_, parentHash) => {
            return parentHash.F1A === "ddd";
          },
        },
        {
          id: "F1C",
          title: "C field",
          type: FIELD_TYPES.COMPOUND,
          options: {
            atLeastOne: true
          },
          fields: [
            {
              id: "F1CA",
              title: "A subfield",
              type: FIELD_TYPES.TEXT,
              validate: (value) => {
                return value === "aaa"
                  ? "This field must not contaion 'aaa'"
                  : null;
              },
            },
            {
              id: "F1CB",
              title: "B subfield",
              type: FIELD_TYPES.CHECKBOX,
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
          type: FIELD_TYPES.TEXT,
          validate: (value) => {
            return value === "" ? "This fieeld is required" : null;
          },
        },
        {
          id: "F1D",
          title: "D field",
          type: FIELD_TYPES.CHECKBOX,
        },
      ],
    },
  ],
};
