import * as React from "react";
/* import * as simpleIcons from "@icons-pack/react-simple-icons"; */
import { simpleIcons } from "./icon-types";
import { useTheme } from "../layout";

import type { SchemaField, TinaField } from "tinacms";
import { IconProps } from "phosphor-react";

const iconColorClass = {
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

const iconSizeClass = {
  small: "w-9 h-9",
  medium: "w-12 h-12",
  large: "w-14 h-14",
};

const formatFieldLabel = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const iconLibrary = simpleIcons;

const iconLibraryKeys: {
  label: string;
  value: keyof typeof iconLibrary;
}[] = Object.keys(iconLibrary).map((icon: keyof typeof iconLibrary) => ({
  label: formatFieldLabel(icon),
  value: icon,
}));

export const IconTechnology = ({
  data,
  parentColor = "",
  className = "",
  tinaField = "",
  svgProps,
}: {
  data: {
    name: keyof typeof iconLibrary;
    sizeClass?: keyof typeof iconSizeClass;
    colorClass?: keyof typeof iconColorClass | "primary";
    styleClass?: "circle" | "float";
  };
  svgProps?: IconProps & React.RefAttributes<SVGSVGElement>;
  parentColor?: string;
  className?: string;
  tinaField?: string;
}) => {
  if (!data) return <></>;

  const theme = useTheme();

  const iconName = data.name;

  if (!iconLibrary) return <i>Invalid Icon Library</i>;

  const Icon = iconLibrary[iconName];

  if (!Icon) return <i>Invalid Icon</i>;

  const iconSizeClasses = data.sizeClass && iconSizeClass[data.sizeClass];

  /* Full class strings are required for Tailwind's just-in-time mode,
     I would love a better solution that doesn't require so much repetition */

  const iconColor = data.colorClass
    ? data.colorClass === "primary"
      ? theme.color
      : data.colorClass
    : theme.color;

  if (data.styleClass == "circle") {
    return (
      <div
        data-tinafield={tinaField}
        className={`relative z-10 inline-flex items-center justify-center flex-shrink-0 ${iconSizeClasses} rounded-full ${iconColorClass[iconColor].circle} ${className}`}
      >
        <Icon className="w-2/3 h-2/3" {...svgProps} />
      </div>
    );
  } else {
    const iconColorClasses =
      iconColorClass[
        parentColor === "primary" &&
        (iconColor === theme.color || iconColor === "primary")
          ? "white"
          : iconColor
      ].regular;
    return (
      <Icon
        data-tinafield={tinaField}
        className={`${iconSizeClasses} ${iconColorClasses} ${className}`}
        {...svgProps}
      />
    );
  }
};
export const iconTechnologyFields: SchemaField[] = [
  {
    type: "string",
    label: "Color",
    name: "colorClass",
    options: Object.keys(iconColorClass).map((color) => ({
      label: formatFieldLabel(color),
      value: color,
    })),
  },
  {
    name: "sizeClass",
    label: "Size",
    type: "string",
    options: ["small", "medium", "large"],
  },
  {
    name: "styleClass",
    label: "Style",
    type: "string",
    options: [
      {
        label: "Circle",
        value: "circle",
      },
      {
        label: "Float",
        value: "float",
      },
    ],
  },
  {
    type: "string",
    label: "Icon",
    name: "name",
    options: iconLibraryKeys,
  },
];

export const iconTechnologySchema: SchemaField & { fields: SchemaField[] } = {
  type: "object",
  label: "Icon",
  name: "icon",
  fields: iconTechnologyFields,
};
