import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { Components, TinaMarkdown } from "tinacms/dist/rich-text";
import type { Template, TinaTemplate } from "tinacms";
import { Button } from "../util/button";
import { Markdown, RichText } from "../util/rich-text";
import { Technology, technologySchema } from "../util/technology";

const components: Components<{
  Button: {
    buttonText: string;
  };
}> = {
  Button: Button,
};

export const Project = ({ data, parentField = "" }) => {
  return (
    <Section color={data.color}>
      <Container
        className={`max-w-8xl prose prose-lg ${
          data.color === "primary" ? `prose-primary` : `dark:prose-dark`
        }`}
        data-tinafield={`${parentField}.body`}
        size="large"
      >
        <h2>{data?.name}</h2>
        <Markdown content={data?.description} />
        <div className="smd:flex">
          {data.exampleImage && (
            <img
              src={data.exampleImage}
              className="smd:w-7/12 w-full object-contain p-2"
            ></img>
          )}
          <div className="p-2">
            <dl>
              {data?.duration && (
                <>
                  <dt className="font-bold">
                    Zeit bis zur ersten Inbetriebnahme
                  </dt>
                  <dd>{data?.duration}</dd>
                </>
              )}
              {data?.industry && (
                <>
                  <dt className="font-bold">Branche</dt>
                  <dd>{data?.industry}</dd>
                </>
              )}
              {data?.usecase && (
                <>
                  <dt className="font-bold">Kundennutzen</dt>
                  <dd>{data?.usecase}</dd>
                </>
              )}
            </dl>
            <div className="mt-8" style={{ willChange: "contents" }}>
              {data?.technologies
                .filter((ref) => ref.technology?.name)
                .map((ref) => (
                  <Technology
                    className="mb-2 mr-2 hover:scale-102 transition-all duration-200 motion-reduce:transition-none motion-reduce:hover:transform-none"
                    data={ref.technology}
                    key={ref.technology?.name}
                  ></Technology>
                ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export const projectBlockSchema: Template = {
  name: "project",
  label: "Referenzprojekt",
  ui: {
    previewSrc: "/blocks/project.png",
    defaultItem: {
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
      label: "Content with Image",
    },
    itemProps: (item) => {
      return { label: item?.label };
    },
  },
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
    },
    RichText("description", "Beschreibung"),
    {
      type: "string",
      label: "Entwicklungsdauer",
      name: "duration",
    },
    {
      type: "string",
      label: "Branche",
      name: "industry",
    },
    {
      type: "string",
      label: "Nutzen",
      name: "usecase",
    },
    {
      type: "image",
      label: "Bild",
      name: "exampleImage",
    },
    {
      type: "object",
      label: "Technologies",
      name: "technologies",
      list: true,
      ui: {
        itemProps: (item) => {
          const tech = item?.technology?.match("content/technologies/(.*).md");
          if (!tech) return { label: item?.label };
          if (tech.length > 1) return { label: tech[1] };
          else return { label: item?.technology };
        },
      },
      fields: [
        {
          type: "reference",
          label: "Technology",
          name: "technology",
          collections: ["technologyCollection"],
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
