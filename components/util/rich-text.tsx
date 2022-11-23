import { RichTextField } from "@tinacms/schema-tools/dist/types";
import { Field } from "@tinacms/toolkit/dist/react-tinacms";
import {
  Components,
  TinaMarkdown,
  TinaMarkdownContent,
} from "tinacms/dist/rich-text";
import { Button } from "./button";
import { Icon, iconFields, iconSchema } from "../icons/icon";
import { IconTechnology, iconTechnologyFields } from "../icons/icon-technology";

//todo fix types
const components: Components<{
  button: any;
  icon: any;
  technologyIcon: any;
}> = {
  button: Button,
  icon: Icon,
  technologyIcon: IconTechnology,
};

export function Markdown({
  content,
}: {
  content: TinaMarkdownContent | TinaMarkdownContent[];
}) {
  return <TinaMarkdown content={content} components={components} />;
}

export function RichText(name: string, label: string): RichTextField {
  return {
    type: "rich-text",
    label: label,
    name: name,
    templates: [
      {
        name: "button",
        label: "Button",
        inline: true,
        fields: [
          {
            name: "buttonText",
            label: "Button Text",
            type: "string",
          },
          {
            name: "buttonHref",
            label: "Button URL",
            type: "string",
          },
          {
            name: "buttonTarget",
            label: "Button Target",
            type: "string",
            options: ["_self", "_blank"],
          },
        ],
      },
      {
        name: "icon",
        label: "Icon",
        inline: true,
        fields: [
          {
            type: "object",
            name: "data",
            fields: iconFields,
          },
        ],
      },
      {
        name: "technologyIcon",
        label: "Technology Icon",
        inline: true,
        fields: [
          {
            type: "object",
            name: "data",
            fields: iconTechnologyFields,
          },
        ],
      },
    ],
  };
}
