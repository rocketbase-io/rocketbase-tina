import React from "react";
import type {
  Customer,
  CustomerConnectionEdges,
  Page,
} from "../.tina/__generated__/types";
import { Banner } from "./blocks/banner";
import { Content } from "./blocks/content";
import { ContentImage } from "./blocks/content-image";
import { Customers } from "./blocks/customers";
import { Features } from "./blocks/features";
import { Hero } from "./blocks/hero";
import { Testimonial } from "./blocks/testimonial";

export const Blocks = (
  props: Omit<Page, "id" | "_sys" | "_values"> & { customers: Customer[] }
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
              case "PageBlocksContentImage":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <ContentImage data={data} parentField={`blocks.${i}`} />
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
