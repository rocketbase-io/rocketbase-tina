import { RichTextField } from "@tinacms/schema-tools/dist/types";
import { Field } from "@tinacms/toolkit/dist/react-tinacms";

export function RichText(name: string, label: string): RichTextField {
  return {
    type: "rich-text",
    label: label,
    name: name,
    templates: [
      {
        name: "Button",
        label: "Button",
        inline: true,
        fields: [
          {
            name: "buttonText",
            label: "Button Text",
            type: "string",
          },
        ],
      },
    ],
  };
}
