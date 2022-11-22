import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { Components, TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaTemplate } from "tinacms";
import { Button } from "../util/button";
import { Markdown, RichText } from "../util/rich-text";

const components: Components<{
  Button: {
    buttonText: string;
  };
}> = {
  Button: Button,
};

export const QuadraContent = ({ data, parentField = "" }) => {
  return (
    <Section color={data.color}>
      <Container
        className={`max-w-8xl prose prose-lg smd:flex  smd:flex-wrap ${
          data.color === "primary" ? `prose-primary` : `dark:prose-dark`
        }`}
        data-tinafield={`${parentField}.body`}
        size="large"
      >
        <div className="p-5 smd:w-6/12">
          <Markdown content={data?.first} />
        </div>
        <div className="p-5 smd:w-6/12">
          <Markdown content={data?.second} />
        </div>
        <div className="p-5 smd:w-6/12">
          <Markdown content={data?.third} />
        </div>
        <div className="p-5 smd:w-6/12">
          <Markdown content={data?.fourth} />
        </div>
      </Container>
    </Section>
  );
};

export const quadraContentBlockSchema: TinaTemplate = {
  name: "quadraContent",
  label: "Content with four Elements",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
      label: "Content with four Elements",
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
    RichText("first", "First Body"),
    RichText("second", "Second Body"),
    RichText("third", "Third Body"),
    RichText("fourth", "Fourth Body"),
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
