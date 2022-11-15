import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { Components, TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaTemplate } from "tinacms";
import { Button } from "../util/button";

export const Customers = ({ data, parentField = "" }) => {
  //const customers = data.
  console.log(data)
  return (
    <Section color={data.color}>
      <Container
        className={`max-w-8xl prose prose-lg flex items-center flex-col ${
          data.color === "primary" ? `prose-primary` : `dark:prose-dark`
        }`}
        data-tinafield={`${parentField}.body`}
        size="large"
      >
        <h2>{data.title}</h2>
        <div className="flex flex-wrap">
          {data.customers && data.customers.map((customer) => {
            return <img src={customer.image} className="sm:w-6/12 md:w-4/12 w-full hover:grayscale-0  grayscale dark:invert dark:hover:invert-0 object-contain" alt={customer.name} key={customer.name}></img>;
          })}
        </div>
      </Container>
    </Section>
  );
};

export const customersBlockSchema: TinaTemplate = {
  name: "customers",
  label: "Customer Block",
  ui: {
    previewSrc: "/blocks/customers.png",
    defaultItem: {
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
      label: "Customer Block"
    },
          itemProps: (item) => {
            return { label: item?.title };
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
      label: "Customers",
      name: "customers",
      list: true,
      fields: [
        {
          type: "image",
          label: "Image",
          name: "image",
        },
        {
            type:"string",
            label: "Name",
            name: "name"
        }
      ],
    },
  ],
};
