import React, { createRef } from "react";
import Head from "next/head";
import { getConfiguration, getDefaultMeta, getPostBySlug } from "../lib/strapi";
import PostHeader from "../components/PostHeader";
import PostBody from "../components/PostBody";
import markdownToHtml from "../lib/markdownToHtml";

export default function Home({ meta, post, configuration }) {
  // const postRef = createRef();
  console.log("Home props :", {
    meta,
    post,
    configuration,
  });
  return (
    <article>
      <Head>
        <title>{post.title}</title>
      </Head>
      <PostHeader title={post.title} />
      <PostBody content={post.content} />
    </article>
  );
}

export async function getStaticProps({ preview = null }) {
  const configuration = await getConfiguration();
  if (!configuration?.home_page) {
    return {
      notFound: true,
    };
  }
  const post = await getPostBySlug(configuration.home_page.slug, preview);
  const content = await markdownToHtml(post.content || "");
  const meta = await getDefaultMeta();

  return {
    props: {
      post: {
        ...post,
        content,
      },
      meta,
      configuration,
    },
    revalidate: 60 * 3,
  };
}
