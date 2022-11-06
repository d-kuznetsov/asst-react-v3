// Step transitions

import { FIELD_TYPES } from '../src/field-types';

export default {
  steps: [
    {
      id: "S1",
      title: "Step 1",
      fields: [
        {
          id: "f1",
          title: "Go to 3th step?",
          type: FIELD_TYPES.CHECKBOX
        }
      ],
      next: (hash) => {
        return hash.f1 ? "S3" : "S2"
      }
    },
    {
      id: "S2",
      title: "Step 2",
      fields: [
        {
          id: "f1",
          title: "Field 1",
          type: FIELD_TYPES.CHECKBOX
        }
      ],
    },
    {
      id: "S3",
      title: "Step 3",
      fields: [
        {
          id: "f1",
          title: "Field 1",
          type: FIELD_TYPES.CHECKBOX
        }
      ]
    },
    {
      id: "S4",
      title: "Step 4",
      fields: [
        {
          id: "f1",
          title: "Field 1",
          type: FIELD_TYPES.CHECKBOX
        }
      ]
    },
    {
      id: "S5",
      title: "Step 5",
      fields: [
        {
          id: "f1",
          title: "Field 1",
          type: FIELD_TYPES.CHECKBOX
        }
      ]
    },
  ],
};
