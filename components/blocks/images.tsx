import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { Components, TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaTemplate } from "tinacms";
import { Button } from "../util/button";
import { Markdown, RichText } from "../util/rich-text";

export const Images = ({ data, parentField = "" }) => {
  return (
    <Section color={data.color}>
      <Container
        className={`max-w-8xl prose prose-lg   ${
          data.color === "primary" ? `prose-primary` : `dark:prose-dark`
        }`}
        data-tinafield={`${parentField}.body`}
        size="large"
      >
        <h2>{data?.title}</h2>
        <div className="smd:flex smd:items-center flex-wrap">
          {data?.images?.map((image) => (
            <div className="smd:w-4/12 w-full p-5" key={image.image}>
              <img className="!mb-4" src={image.image} alt={image.label} />
              <div className="h-8">{image.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export const imagesBlockSchema: TinaTemplate = {
  name: "images",
  label: "Images",
  ui: {
    itemProps: (item) => {
      return { label: item?.label };
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "object",
      label: "Images",
      name: "images",
      ui: {
        itemProps: (item) => {
          return { label: item?.label };
        },
      },
      list: true,
      fields: [
        {
          type: "image",
          name: "image",
          label: "Image",
        },
        {
          type: "string",
          name: "label",
          label: "Label",
        },
      ],
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
