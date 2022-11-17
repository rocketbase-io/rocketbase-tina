import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { Components, TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaTemplate } from "tinacms";
import { Button } from "../util/button";
import { RichText } from "../util/rich-text";

const components: Components<{
  Button: {
    buttonText: string;
  };
}> = {
  Button: Button,
};

export const DoubleContent = ({ data, parentField = "" }) => {
  return (
    <Section color={data.color}>
      <Container
        className={`max-w-8xl prose prose-lg smd:flex  ${
          data.color === "primary" ? `prose-primary` : `dark:prose-dark`
        }`}
        data-tinafield={`${parentField}.body`}
        size="large"
      >
        <div className={`px-5 max-smd:!w-full`} style={{width:`${data?.ratio}%`}}>
          <TinaMarkdown content={data?.leftBody} components={components} />
        </div>
        <div className={`px-5`}>
          <TinaMarkdown content={data?.rightBody} components={components} />
        </div>
      </Container>
    </Section>
  );
};

export const doubleContentBlockSchema: TinaTemplate = {
  name: "doubleContent",
  label: "Content with two columns",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
      label: "Content with two column",
    },
    itemProps: (item) => {
      return { label: item?.label };
    },
  },
  fields: [
    {
      type: "string",
      label: "Label",
      name: "label",
    },
    RichText("leftBody", "Left Column"),
    RichText("rightBody", "Right Column"),
    {
      type: "string",
      name: "ratio",
      label: "Ratio",
      options: ["10", "20", "30", "40", "50", "60", "70", "80", "90"],
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" },
      ],
    },
  ],
};
