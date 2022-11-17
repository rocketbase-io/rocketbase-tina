import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { Components, TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaTemplate } from "tinacms";
import { Button } from "../util/button";

export const Customers = ({ data, parentField = "" }) => {
  return (
    <Section color={data.color}>
      <Container
        className={`max-w-8xl prose prose-lg flex items-center flex-col ${
          data.color === "primary" ? `prose-primary` : `dark:prose-dark`
        }`}
        data-tinafield={`${parentField}.body`}
        size="large"
      >
        {!data.showDetails && (
          <>
            <h2>{data.title}</h2>
            <div className="flex flex-wrap">
              {data.customers &&
                data.customers.slice(0, data.amount).map((customer) => {
                  return (
                    <img
                      src={customer.image}
                      className="sm:w-6/12 md:w-4/12 lg:w-3/12 w-full hover:grayscale-0  grayscale dark:invert dark:hover:invert-0 object-contain  duration-200 ease-in-out
                      transtion !my-0 p-5
                      "
                      alt={customer.name}
                      key={customer.name}
                    ></img>
                  );
                })}
            </div>
          </>
        )}
        {data.showDetails && (
          <>
            <h2>{data.title}</h2>
            <div className="md:flex flex-wrap">
              {data.customers &&
                data.customers
                  .filter(
                    (customer) =>
                      customer.comment && customer.comment.length > 0
                  )
                  .slice(0, data.amount)
                  .map((customer) => {
                    return (
                      <div
                        className="p-3 md:w-6/12 w-full"
                        key={customer.name}
                        style={{ willChange: "contents" }}
                      >
                        <div className="md:flex items-start shadow-lg w-full h-full p-3 hover:scale-102 transition-all duration-200 motion-reduce:transition-none motion-reduce:hover:transform-none">
                          <img
                            src={customer.image}
                            className="w-4/12 object-contain max-md:ml-auto max-md:mr-auto 
                          md:mr-4
                          max-md:!mb-2 !mt-0"
                            alt={customer.name}
                          ></img>
                          <div>
                            <div className="max-md:text-center">
                              "{customer.comment}"
                            </div>
                            <div className="mt-5 max-md:text-center dark:text-gray-300 text-gray-500">
                              {customer.source}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </>
        )}
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
      label: "Customer Block",
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
      type: "boolean",
      label: "Details",
      name: "showDetails",
    },
    {
      type: "number",
      label: "Anzahl an Kunden",
      name: "amount",
    },
  ],
};
