// Submit

import { FIELD_TYPES } from "../src/field-types";

const sendData = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
      console.dir(data)
    }, 2000)
  })
}

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
      submit: async () => {
        await sendData()
      }
    },
    {
      id: "done",
      title: "Done",
      type: "STEP_TYPE_DONE",
    },
  ],
};
