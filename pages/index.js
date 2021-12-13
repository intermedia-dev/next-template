import React, { createRef } from "react";
import Head from "next/head";
import {
  getConfiguration,
  getHomePageByState,
  getCards,
  getNavigation,
  getBanner,
  getSidebarWithImages,
  getSidebarWithLinks,
} from "../lib/strapi";
import PostHeader from "../components/PostHeader";
import { PostContent } from "../components/";

export default function Home({ meta, post, configuration }) {
  console.log(post);
  return (
    <article>
      <Head>
        <title>{post.title}</title>
      </Head>
      <PostHeader title={post.title} />
      <PostContent content={post.content} />
    </article>
  );
}

export async function getStaticProps({ preview = null }) {
  const configuration = await getConfiguration();
  const post = await getHomePageByState();
  if (post) {
    post.slug = "";
    post.title = configuration.siteName;
    post.meta_title = configuration.siteName;
  }
  const cards = (await getCards("main")) || [];
  const bottom_nav = (await getNavigation("bottom_navigation")) || [];
  const top_nav = (await getNavigation("top_navigation")) || [];
  const banner = (await getBanner()) || {};
  const organizations =
    (await getSidebarWithImages("non_profits_organizations")) || {};
  const counties_info = (await getSidebarWithLinks()) || {};
  return {
    props: {
      post: post || {},
      configuration,
      cards,
      bottom_nav,
      top_nav,
      banner,
      organizations,
      counties_info,
    },
    revalidate: 60 * 3,
  };
}
