// Submit

import { FIELD_TYPES } from "../src/field-types";

const sendData = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
      console.dir(data);
    }, 2000);
  });
};

export default {
  steps: [
    {
      id: "S1",
      title: "Step 1",
      fields: [
        {
          id: "f1",
          title: "Name",
          type: FIELD_TYPES.CHECKBOX,
        },
        {
          id: "f2",
          title: "Read?",
          type: FIELD_TYPES.TEXT,
          validate: (value) => {
            return value === "a" ? "cannot be an a" : null;
          }
        },

        {
          id: "f3",
          title: "List",
          type: FIELD_TYPES.COMPOUND,
          fields: [
            {
              id: "sf1",
              title: "Subfield 1",
              type: FIELD_TYPES.TEXT,
            },
            {
              id: "sf2",
              title: "Subfield 2",
              type: FIELD_TYPES.CHECKBOX,
            },
          ],
        },
      ],
      next: () => {
        return "overview";
      },
    },
    {
      id: "overview",
      title: "Overview",
      type: "STEP_TYPE_OVERVIEW",
      next: () => {
        return "done";
      },
      submit: async (data) => {
        await sendData(data);
      },
    },
    {
      id: "done",
      title: "Done",
      type: "STEP_TYPE_DONE",
    },
  ],
};
