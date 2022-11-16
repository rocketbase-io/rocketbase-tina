export {};

import * as React from "react";
import { useTheme } from "../layout";
import TinaIconSvg from "../../public/tina.svg";
import type { Field, SchemaField, TinaField } from "tinacms";
import { Icon, iconSchema } from "./icon";

const colorClass: { [name: string]: { regular: string; circle: string } } =
  {
    blue: {
      regular: "text-blue-400",
      circle: "bg-blue-400 dark:bg-blue-500 text-blue-50",
    },
    teal: {
      regular: "text-teal-400",
      circle: "bg-teal-400 dark:bg-teal-500 text-teal-50",
    },
    green: {
      regular: "text-green-400",
      circle: "bg-green-400 dark:bg-green-500 text-green-50",
    },
    red: {
      regular: "text-red-400",
      circle: "bg-red-400 dark:bg-red-500 text-red-50",
    },
    pink: {
      regular: "text-pink-400",
      circle: "bg-pink-400 dark:bg-pink-500 text-pink-50",
    },
    purple: {
      regular: "text-purple-400",
      circle: "bg-purple-400 dark:bg-purple-500 text-purple-50",
    },
    orange: {
      regular: "text-orange-400",
      circle: "bg-orange-400 dark:bg-orange-500 text-orange-50",
    },
    yellow: {
      regular: "text-yellow-400",
      circle: "bg-yellow-400 dark:bg-yellow-500 text-yellow-50",
    },
    white: {
      regular: "text-white opacity-80",
      circle: "bg-white-400 dark:bg-white-500 text-white-50",
    },
  };

export const Technology = ({ data }) => {
  <Icon parentColor={data.primaryColor} data={data.icon}></Icon>;
};

const formatFieldLabel = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const technologySchema: SchemaField & { fields: SchemaField[] } = {
  type: "object",
  label: "Technology",
  name: "technology",
 
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
      required: true,
    },
    iconSchema,
  ],
};
