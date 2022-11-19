// S

import { FIELD_TYPES } from "../src/field-types";

export default {
  steps: [
    {
      id: "S1",
      title: "Step 1",
      fields: [
        {
          id: "textField",
          title: "Text Field",
          type: FIELD_TYPES.TEXT,
          options: {
            label: "textfield label",
            type: "number",
            multiline: true,
          },
          validate: (value) => {
            return value === "a" ? "Must not be an a" : null;
          },
        },
        {
          id: "select",
          title: "Select",
          type: FIELD_TYPES.SELECT,
          options: {
            label: "select label",
            items: [
              {
                label: "A letter",
                value: "a",
              },
              {
                label: "B letter",
                value: "b",
              },
              {
                label: "C letter",
                value: "c",
              },
            ],
          },
          validate: (value) => {
            return value === "c" ? "Cannot be a c" : null;
          },
        },
        {
          id: "checkbox",
          title: "Checkbox",
          type: FIELD_TYPES.CHECKBOX,
          options: {
            label: "checkbox label",
          },
        },
        {
          id: "checkboxGroup",
          title: "Checkbox group",
          type: FIELD_TYPES.CHECKBOX_GROUP,
          options: {
            items: [
              {
                label: "A letter",
                value: "a",
              },
              {
                label: "B letter",
                value: "b",
              },
              {
                label: "C letter",
                value: "c",
              },
            ],
          },
          validate: (value) => {
            return value.c ? "cannot be a c" : null;
          }
        },
        {
          id: "radioGroup",
          title: "Radio group",
          type: FIELD_TYPES.RADIO_GROUP,
          options: {
            items: [
              {
                label: "A letter",
                value: "a",
              },
              {
                label: "B letter",
                value: "b",
              },
              {
                label: "C letter",
                value: "c",
              },
            ],
          },
          validate: (value) => {
            return value === "c" ? "cannot be a c" : null;
          }
        },
        {
          id: "slider",
          title: "Slider",
          type: FIELD_TYPES.SLIDER,
          validate: (value) => {
            return value === 0 ? "More than 0" : null;
          }
        },
        {
          id: "fileUpload",
          title: "File upload",
          type: FIELD_TYPES.FILE_UPLOAD,
          validate: (value) => {
            return value.length ? null : "There should be at least one file";
          }
        },
      ],
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
