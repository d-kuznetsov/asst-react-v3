// Step transitions

import { FIELD_TYPES } from "../src/field-types";

export default {
  steps: [
    {
      id: "S1",
      title: "Step 1",
      fields: [
        {
          id: "f1",
          title: "Go to 3th step?",
          type: FIELD_TYPES.CHECKBOX,
        },
      ],
      next: (hash) => {
        return hash.f1 ? "S3" : "S2";
      },
    },
    {
      id: "S2",
      title: "Step 2",
      fields: [
        {
          id: "f1",
          title: "Field 1",
          type: FIELD_TYPES.CHECKBOX,
        },
      ],
      next: () => {
        return "S3";
      },
    },
    {
      id: "S3",
      title: "Step 3",
      fields: [
        {
          id: "f1",
          title: "Field 1",
          type: FIELD_TYPES.TEXT,
        },
        {
          id: "f2",
          title: "Field 2",
          type: FIELD_TYPES.COMPOUND,
          fields: [
            {
              id: "f1",
              title: "Subfield 1",
              type: FIELD_TYPES.TEXT,
            },
            {
              id: "f2",
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
      id: "S4",
      title: "Step 4",
      fields: [
        {
          id: "f1",
          title: "Field 1",
          type: FIELD_TYPES.CHECKBOX,
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
    },
    {
      id: "done",
      title: "Done",
      type: "STEP_TYPE_DONE",
    },
  ],
};
