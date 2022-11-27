// real example
import { FIELD_TYPES } from "../src/field-types";

const ERROR_MESSAGE = "Bitte geben Sie die gewünschte Information ein.";

export default {
  steps: [
    /*     {
      id: "Information about the regulation",
      title: "Angaben zur Verordnung",
      fields: [
        {
          id: "recipe by doctor",
          title:
            "Wurde das Rezept von einem Arzt (kein Heilpraktiker) ausgestellt?",
          type: FIELD_TYPES.RADIO_GROUP,
          options: {
            items: [
              {
                label: "Ja",
                value: "yes",
              },
              {
                label: "Nein",
                value: "no",
              },
            ],
          },
          validate: (value) => {
            return value ? null : ERROR_MESSAGE;
          },
        },
        {
          id: "Wurde das Rezept vom Arzt unterschrieben?",
          title: "Wurde das Rezept vom Arzt unterschrieben?",
          type: FIELD_TYPES.RADIO_GROUP,
          options: {
            items: [
              {
                label: "Ja",
                value: "yes",
              },
              {
                label: "Nein",
                value: "no",
              },
            ],
          },
          hide: (_, stepMap) => {
            return stepMap["recipe by doctor"] !== "yes";
          },
        },
        // 3
        {
          id: "Verordnungsdatum",
          title: "Verordnungsdatum",
          type: FIELD_TYPES.TEXT,
          info: "An welchem Tag wurde das Rezept ausgestellt?",
          options: {
            type: "date",
          },
          columns: 1,
          validate: (value) => {
            return value ? null : ERROR_MESSAGE;
          },
        },
        // 4
        {
          id: "Abgabedatum",
          title: "Abgabedatum",
          type: FIELD_TYPES.TEXT,
          info: "An welchem Tag haben Sie das Arzneimittel in der Apotheke erhalten? (Datum der Quittung oder des Rezeptaufdrucks der Apotheke)",
          options: {
            type: "date",
          },
          columns: 1,
          validate: (value, stepMap) => {
            if (!value) {
              return ERROR_MESSAGE;
            }
            return stepMap["Verordnungsdatum"] < value
              ? null
              : "Abgabedatum muss nach dem Verordnungsdatum sein";
          },
        },
        // 5
        {
          id: "discount",
          title: "Hat Ihnen die Apotheke einen Rabatt gewährt?",
          type: FIELD_TYPES.RADIO_GROUP,
          options: {
            items: [
              {
                label: "Ja",
                value: "yes",
              },
              {
                label: "Nein",
                value: "no",
              },
            ],
          },
        },
        // 6
        {
          id: "Höhe des Rabattes in Euro",
          title: "Höhe des Rabattes in Euro",
          type: FIELD_TYPES.TEXT,
          columns: 1,
          options: {
            type: "number",
          },
          hide: (_, stepMap) => {
            return stepMap["discount"] !== "yes";
          },
        },
        // 7
        {
          id: "Welche Arzneimittel wurden verordnet?",
          title: "Welche Arzneimittel wurden verordnet?",
          type: FIELD_TYPES.CHECKBOX_GROUP,
          options: {
            items: [
              {
                label: "Alternative Arzneimittel",
                value: "Alternative Arzneimittel",
              },
              {
                label: "Arzneimittel, das bei einer Notfallbehandlung privat verordnet wurde",
                value: "Arzneimittel, das bei einer Notfallbehandlung privat verordnet wurde",
              },
              {
                label: "Arzneimittel im Rahmen einer Schwangerschaft",
                value: "Arzneimittel im Rahmen einer Schwangerschaft",
              },
              {
                label: "Sonstige Arzneimittel",
                value: "Sonstige Arzneimittel",
              },
            ]
          }
        }
      ],
      next: () => {
        return "Angaben zu den Arzneimitteln";
      },
    }, */
    /*     {
      id: "Angaben zu den Arzneimitteln",
      title: "Angaben zu den Arzneimitteln",
      fields: [
        {
          id: "Welche Arzneimittel wurden gekauft?",
          title: "Welche Arzneimittel wurden gekauft?",
          type: FIELD_TYPES.COMPOUND,
          options: {
            atLeastOne: true,
          },
          fields: [
            {
              id: "Pharmazentralnummer (PZN)",
              title: "Pharmazentralnummer (PZN)",
              type: FIELD_TYPES.TEXT,
              info: "Die Pharmazentralnummer (PZN) finden Sie auf dem Rezept/der Apothekenquittung oder auf der Verpackung des Arzneimittels.",
              options: {},
              validate: (value) => {
                const res = value ? null : ERROR_MESSAGE;
                console.log(res);
                return res;
              },
            },
            {
              id: "Anzahl der Packungen",
              title: "Anzahl der Packungen",
              type: FIELD_TYPES.TEXT,
              options: {
                type: "number",
              },
            },
            {
              id: "Gesamtkosten des Arzneimittels in Euro",
              title: "Gesamtkosten des Arzneimittels in Euro",
              info: "Den Betrag entnehmen Sie bitte der Apothekenquittung.",
              type: FIELD_TYPES.TEXT,
              options: {
                type: "number",
              },
            },
          ],
        },
      ],
      next: () => {
        return "Hochzuladende Dokumente";
      },
    }, */
    /*     {
      id: "Hochzuladende Dokumente",
      title: "Hochzuladende Dokumente",
      fields: [
        {
          id: "Bitte laden Sie hier die Dokumente hoch",
          title: "Bitte laden Sie hier die Dokumente hoch",
          type: FIELD_TYPES.FILE_UPLOAD,
          info: "Ärztliche Verordnung des Arzneimittels",
          validate: (value) => {
            return value.length ? null : "Bitte laden Sie eine Datei hoch.";
          },
        },
        {
          id: "checkbox",
          title: "Richtigkeit der Angaben",
          type: FIELD_TYPES.CHECKBOX,
          options: {
            label:
              "Hiermit bestätige ich verbindlich die Richtigkeit meiner Angaben.",
          },
          validate: (value) => {
            return value
              ? null
              : "Bitte bestätigen Sie per Klick auf das Kästchen, dass Sie dem Text zustimmen.";
          },
        },
      ],
      next: () => {
        return "Erstattungsdaten";
      },
    }, */
    {
      id: "Erstattungsdaten",
      title: "Erstattungsdaten",
      fields: [
        {
          id: "Bankverbindung",
          title: "Welche Bankverbindung soll genutzt werden?",
          type: FIELD_TYPES.RADIO_GROUP,
          options: {
            items: [
              {
                label: "DEXX XXXX XXXX XXXX XX64 00",
                value: "DEXX",
              },
              {
                label: "Andere Bankverbindung angeben",
                value: "andere",
              },
            ],
          },
        },
      ],
      next: (stepMap) => {
        return stepMap["Bankverbindung"] === "DEXX" ? "overview" : "Bankverbindung";
      },
    },
    {
      id: "Bankverbindung",
      title: "Bankverbindung",
      fields: [
        {
          id: "IBAN",
          title: "IBAN",
          type: FIELD_TYPES.TEXT,
          options: {},
        },
        {
          id: "Kontoinhaber",
          title: "Kontoinhaber",
          type: FIELD_TYPES.TEXT,
          options: {},
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
        await new Promise((resolve) => setTimeout(resolve, 2000, data));
      },
    },
    {
      id: "done",
      title: "Done",
      type: "STEP_TYPE_DONE",
    },
  ],
};
