import { Blocks } from "../components/blocks-renderer";
import { useTina } from "tinacms/dist/react";
import { Layout } from "../components/layout";
import { client } from "../.tina/__generated__/client";
import { Customer } from "../.tina/__generated__/types";

export default function HomePage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const customers = props.pageProps.data.customerConnection.edges.map((e) => {
    return e.node._values as Customer;
  });

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const merged_data = { ...data.page, customers: customers };
  return (
    <Layout rawData={data} data={data.global as any}>
      <Blocks {...merged_data} />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.contentQuery({
    relativePath: `${params.filename}.md`,
  });
  const pageProps = await client.queries.pageQuery();
  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      pageProps: {
        ...pageProps,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const pagesListData = await client.queries.pageConnection();
  return {
    paths: pagesListData.data.pageConnection.edges.map((page) => ({
      params: { filename: page.node._sys.filename },
    })),
    fallback: false,
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
