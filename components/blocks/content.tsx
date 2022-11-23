import React, { useContext, useEffect, useState } from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { Components, TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaTemplate } from "tinacms";
import { Button } from "../util/button";
import { Markdown, RichText } from "../util/rich-text";
import {  useTheme } from "../layout/theme";

const components: Components<{
  Button: {
    buttonText: string;
  };
}> = {
  Button: Button,
};

export const Content = ({ data, parentField = "" }) => {
  const theme = useTheme();
 

  return (
    <Section
      color={data.color}
      style={{
        backgroundImage:
          data?.bgImageDark && theme.isDark
            ? `url(${data?.bgImageDark})`
            : data?.bgImage
            ? `url(${data.bgImage})`
            : "none",
      }}
    >
      <Container
        className={`max-w-8xl prose prose-lg smd:flex smd:items-center  ${
          data.color === "primary" ? `prose-primary` : `dark:prose-dark`
        }`}
        data-tinafield={`${parentField}.body`}
        size="large"
      >
        {data.contentImage && (data.reverse == false || !data.reverse) && (
          <img
            src={data?.contentImage}
            className={`w-${data.imageWidth ?? 5}/12 max-smd:w-full p-2`}
          ></img>
        )}
        <div className={`p-2 w-full`}>
          <h4>{data?.subtitle}</h4>
          <Markdown content={data?.body} />
        </div>
        {data.contentImage && data.reverse == true && (
          <img
            src={data?.contentImage}
            className={`w-${data.imageWidth ?? 5}/12 max-smd:w-full p-2`}
          ></img>
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
      type: "string",
      label: "Image Width",
      name: "imageWidth",
      options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
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
    {
      type: "image",
      label: "Background Image",
      name: "bgImage",
    },
    {
      type: "image",
      label: "Background Image Dark",
      name: "bgImageDark",
    },
  ],
};
