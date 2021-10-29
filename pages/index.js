import React, { createRef } from "react";
import Head from "next/head";
import { getConfiguration, getDefaultMeta, getPostBySlug } from "../lib/strapi";
import PostHeader from "../components/PostHeader";
import PostBody from "../components/PostBody";
import markdownToHtml from "../lib/markdownToHtml";

export default function Home({ meta, post, configuration }) {
  // const postRef = createRef();
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
  const post = await getPostBySlug(configuration.homepage_slug, preview);
  const content = await markdownToHtml(post.content || "");
  const meta = await getDefaultMeta();

  return {
    props: {
      post: {
        post,
        content,
      },
      meta,
      configuration,
    },
    revalidate: 60 * 3,
  };
}
