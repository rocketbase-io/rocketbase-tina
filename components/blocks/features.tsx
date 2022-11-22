import { Actions } from "../util/actions";
import { Section } from "../util/section";
import { Container } from "../util/container";
import { Icon } from "../util/icon";
import type { TinaTemplate } from "tinacms";
import { iconSchema } from "../util/icon";

export const Feature = ({ featuresColor, data, tinaField }) => {
  return (
    <div
      data-tinafield={tinaField}
      className="flex-1 flex flex-col gap-6 text-center items-center lg:items-start lg:text-left max-w-xl mx-auto"
      style={{ flexBasis: "16rem" }}
    >
      {data.icon && (
        <Icon
          tinaField={`${tinaField}.icon`}
          parentColor={featuresColor}
          data={{ sizeClass: "large", ...data.icon }}
        />
      )}
      {data.title && (
        <h3
          data-tinafield={`${tinaField}.title`}
          className="text-2xl font-semibold title-font  !my-1"
        >
          {data.title}
        </h3>
      )}
      {data.text && (
        <p
          data-tinafield={`${tinaField}.text`}
          className="text-base opacity-80 leading-relaxed"
        >
          {data.text}
        </p>
      )}
      {data.actions && <Actions actions={data.actions} />}
    </div>
  );
};

export const Features = ({ data, parentField }) => {
  return (
    <Section color={data.color}>
      <Container
        className={`max-w-8xl prose prose-lg ${
          data.color === "primary" ? `prose-primary` : `dark:prose-dark`
        }`}
        size="large"
      >
        <h4>{data.subTitle}</h4>
        <h2>{data.title}</h2>
        <div className="flex flex-wrap gap-x-10 gap-y-8">
          {data.items &&
            data.items.map(function (block, i) {
              return (
                <Feature
                  tinaField={`${parentField}.items.${i}`}
                  featuresColor={data.color}
                  key={i}
                  data={block}
                />
              );
            })}
        </div>
      </Container>
    </Section>
  );
};

const defaultFeature = {
  title: "Here's Another Feature",
  text: "This is where you might talk about the feature, if this wasn't just filler text.",
  icon: {
    colorClass: "",
    styleClass: "float",
    sizeClass: "large",
    name: "",
  },
};

export const featureBlockSchema: TinaTemplate = {
  name: "features",
  label: "Features",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: {
      items: [defaultFeature, defaultFeature, defaultFeature],
    },
    itemProps: (item) => {
      return {
        label: item?.title,
      };
    },
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
    },
    {
      name: "subTitle",
      label: "Sub Title",
      type: "string",
    },
    {
      type: "object",
      label: "Feature Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title,
          };
        },
        defaultItem: {
          ...defaultFeature,
        },
      },
      fields: [
        iconSchema,
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Text",
          name: "text",
          ui: {
            component: "textarea",
          },
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
