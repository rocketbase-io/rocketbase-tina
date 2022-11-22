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

export const Content = ({ data, parentField = "" }) => {
  return (
    <Section color={data.color}>
      <Container
        className={`max-w-8xl prose prose-lg smd:flex smd:items-center ${
          data.color === "primary" ? `prose-primary` : `dark:prose-dark`
        }`}
        data-tinafield={`${parentField}.body`}
        size="large"
      >
        {data.contentImage && (data.reverse == false || !data.reverse) && (
          <img src={data?.contentImage} className="smd:w-5/12 h-full p-2"></img>
        )}
        <div className={` p-2 ${data.contentImage ? "smd:w-7/12" : ""}`}>
          <h4>{data?.subtitle}</h4>
          <TinaMarkdown content={data?.body} components={components} />
        </div>
        {data.contentImage && data.reverse == true && (
          <img src={data?.contentImage} className="smd:w-5/12 h-full p-2"></img>
        )}
      </Container>
    </Section>
  );
};

export const contentBlockSchema: TinaTemplate = {
  name: "content",
  label: "Content",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
      label: "Content",
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
    RichText("body", "Body"),
    {
      type: "string",
      label: "Sub Title",
      name: "subtitle",
    },
    {
      type: "image",
      label: "Image",
      name: "contentImage",
    },
    {
      type: "boolean",
      label: "Reverse",
      name: "reverse",
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