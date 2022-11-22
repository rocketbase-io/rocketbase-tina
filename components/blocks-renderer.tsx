import React from "react";
import type {
  ContentQueryQuery,
  Customer,
  CustomerConnectionEdges,
  Page,
} from "../.tina/__generated__/types";
import { Banner } from "./blocks/banner";
import { Content } from "./blocks/content";
import { Customers } from "./blocks/customers";
import { DoubleContent } from "./blocks/double-content";
import { Features } from "./blocks/features";
import { Hero } from "./blocks/hero";
import { Images } from "./blocks/images";
import { Project } from "./blocks/project";
import { QuadraContent } from "./blocks/quadra-content";
import { Testimonial } from "./blocks/testimonial";

export const Blocks = (
  props: ContentQueryQuery["page"] & { customers: Customer[] }
) => {
  return (
    <>
      {props.blocks
        ? props.blocks.map(function (block, i) {
            const data = { ...block, customers: props.customers };
            switch (block.__typename) {
              case "PageBlocksContent":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <Content data={data} parentField={`blocks.${i}`} />
                  </div>
                );
              case "PageBlocksDoubleContent":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <DoubleContent data={data} parentField={`blocks.${i}`} />
                  </div>
                );
              case "PageBlocksQuadraContent":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <QuadraContent data={data} parentField={`blocks.${i}`} />
                  </div>
                );
              case "PageBlocksImages":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <Images data={data} parentField={`blocks.${i}`} />
                  </div>
                );
              case "PageBlocksCustomers":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <Customers data={data} parentField={`blocks.${i}`} />
                  </div>
                );
              case "PageBlocksProject":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <Project data={data} parentField={`blocks.${i}`} />
                  </div>
                );
              case "PageBlocksHero":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <Hero data={data} parentField={`blocks.${i}`} />
                  </div>
                );
              case "PageBlocksBanner":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <Banner data={data} parentField={`blocks.${i}`} />
                  </div>
                );
              case "PageBlocksFeatures":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <Features data={data} parentField={`blocks.${i}`} />
                  </div>
                );
              case "PageBlocksTestimonial":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <Testimonial data={data} parentField={`blocks.${i}`} />
                  </div>
                );
              default:
                return null;
            }
          })
        : null}
    </>
  );
};
