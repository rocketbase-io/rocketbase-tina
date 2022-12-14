import { defineStaticConfig } from "tinacms";
import { featureBlockSchema } from "../components/blocks/features";
import { heroBlockSchema } from "../components/blocks/hero";
import { bannerBlockSchema } from "../components/blocks/banner";
import { testimonialBlockSchema } from "../components/blocks/testimonial";
import { contentBlockSchema } from "../components/blocks/content";
import { doubleContentBlockSchema } from "../components/blocks/double-content";
import { quadraContentBlockSchema } from "../components/blocks/quadra-content";
import { customersBlockSchema } from "../components/blocks/customers";
import { imagesBlockSchema } from "../components/blocks/images";
import { projectBlockSchema } from "../components/blocks/project";
import { removeDiacritics } from "../util/util";
import { technologySchema } from "../components/util/technology";
import { iconSchema } from "../components/icons/icon";
import { iconTechnologySchema } from "../components/icons/icon-technology";

const config = defineStaticConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH! || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF! || // Vercel branch env
    process.env.HEAD!, // Netlify branch env
  token: process.env.TINA_TOKEN!,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
  },
  schema: {
    collections: [
      {
        label: "Kunden",
        name: "customer",
        path: "content/customers",
        format: "md",
        ui: {
          filename: {
            slugify(values) {
              return `${removeDiacritics(values?.name?.toLowerCase())}`;
            },
          },
        },
        fields: [
          {
            type: "string",
            label: "Name",
            name: "name",
            required: true,
          },
          {
            type: "image",
            label: "Logo",
            name: "image",
          },
          {
            type: "string",
            label: "Kommentar",
            name: "comment",
          },
          {
            type: "string",
            label: "Quelle",
            name: "source",
          },
        ],
      },
      {
        label: "Global",
        name: "global",
        path: "content/global",
        format: "json",
        ui: {
          global: true,
        },
        fields: [
          {
            type: "object",
            label: "Header",
            name: "header",
            fields: [
              {
                type: "image",
                name: "image",
                label: "Header Image",
              },
              {
                type: "string",
                label: "Color",
                name: "color",
                options: [
                  { label: "Default", value: "default" },
                  { label: "Primary", value: "primary" },
                ],
              },
              {
                type: "object",
                label: "Nav Links",
                name: "nav",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.label };
                  },
                  defaultItem: {
                    href: "home",
                    label: "Home",
                  },
                },
                fields: [
                  {
                    type: "string",
                    label: "Link",
                    name: "href",
                  },
                  {
                    type: "string",
                    label: "Label",
                    name: "label",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            label: "Footer",
            name: "footer",
            fields: [
              {
                type: "string",
                label: "Color",
                name: "color",
                options: [
                  { label: "Default", value: "default" },
                  { label: "Primary", value: "primary" },
                ],
              },
              {
                type: "object",
                label: "Social Links",
                name: "socials",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Name",
                  },
                  {
                    type: "string",
                    name: "src",
                    label: "URL",
                  },
                  iconTechnologySchema,
                ],
              },
            ],
          },
          {
            type: "object",
            label: "Theme",
            name: "theme",
            fields: [
              {
                type: "string",
                label: "Primary Color",
                name: "color",
                options: [
                  {
                    label: "Blue",
                    value: "blue",
                  },
                  {
                    label: "Teal",
                    value: "teal",
                  },
                  {
                    label: "Green",
                    value: "green",
                  },
                  {
                    label: "Red",
                    value: "red",
                  },
                  {
                    label: "Pink",
                    value: "pink",
                  },
                  {
                    label: "Purple",
                    value: "purple",
                  },
                  {
                    label: "Orange",
                    value: "orange",
                  },
                  {
                    label: "Yellow",
                    value: "yellow",
                  },
                ],
              },
              {
                type: "string",
                name: "font",
                label: "Font Family",
                options: [
                  {
                    label: "System Sans",
                    value: "sans",
                  },
                  {
                    label: "Nunito",
                    value: "nunito",
                  },
                  {
                    label: "DeliveryNote-Regular",
                    value: "note",
                  },
                  {
                    label: "MohrAlt-Light",
                    value: "mohr",
                  },
                  {
                    label: "Lato",
                    value: "lato",
                  },
                ],
              },
              {
                type: "string",
                name: "icon",
                label: "Icon Set",
                options: [
                  {
                    label: "Boxicons",
                    value: "boxicon",
                  },
                  {
                    label: "Heroicons",
                    value: "heroicon",
                  },
                ],
              },
              {
                type: "string",
                name: "darkMode",
                label: "Dark Mode",
                options: [
                  {
                    label: "System",
                    value: "system",
                  },
                  {
                    label: "Light",
                    value: "light",
                  },
                  {
                    label: "Dark",
                    value: "dark",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: "Pages",
        name: "page",
        path: "content/pages",
        format: "md",
        ui: {
          router: ({ document }) => {
            /* if (document._sys.filename === "home") {
              return `/`;
            }
            if (document._sys.filename === "about") {
              return `/about`;
            }
            if (document._sys.filename === "referenzen") {
              return `/referenzen`;
            }
            return undefined; */
            return `/${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            isTitle: true,
            required: true,
          },
          {
            type: "boolean",
            label: "Dark Header",
            name: "darkHeader",
          },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Sections",
            ui: {
              visualSelector: true,
            },
            templates: [
              bannerBlockSchema,
              heroBlockSchema,
              featureBlockSchema,
              customersBlockSchema,
              projectBlockSchema,
              contentBlockSchema,
              doubleContentBlockSchema,
              quadraContentBlockSchema,
              testimonialBlockSchema,
              imagesBlockSchema,
            ],
          },
        ],
      },
      {
        name: "technologyCollection",
        label: "Technologies",
        path: "content/technologies",
        ui: {
          filename: {
            slugify(values) {
              return `${removeDiacritics(values?.name?.toLowerCase())}`;
            },
          },
        },
        fields: [...technologySchema.fields],
      },
    ],
  },
});

export default config;
