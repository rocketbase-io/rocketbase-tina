import * as React from "react";
import type { Template } from "tinacms";
import { IconTechnology, iconTechnologySchema } from "../icons/icon-technology";

export const Technology = ({ data, className = "" }) => {
  if (data && data.icon) data.icon.style = "circle";
  return (
    <a
      href={data?.src}
      className={`inline-flex gap-2 items-center w-48  rounded !no-underline ${className}`}
      style={{
        color: data?.primaryColor,
        backgroundColor: data?.secondaryColor,
      }}
    >
      <div
        className={`h-9 w-9 brightness-90 flex items-center justify-center rounded `}
        style={{ backgroundColor: data?.secondaryColor}}
      >
        <IconTechnology
          svgProps={{color:data?.primaryColor}}
          data={data?.icon}
        ></IconTechnology>
      </div>

      {data?.name}
    </a>
  );
};

export const technologySchema: Template = {
  label: "Technology",
  name: "technology",

  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
      required: true,
    },
    {
      type: "string",
      label: "URL",
      name: "src",
    },
    {
      type: "string",
      label: "Primary Color",
      name: "primaryColor",
    },
    {
      type: "string",
      label: "Secondary Color",
      name: "secondaryColor",
    },
    iconTechnologySchema,
  ],
};
