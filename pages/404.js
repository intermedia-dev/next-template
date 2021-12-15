import React, { createRef, useRef } from "react";
import {
  getArticlesSlugsByState,
  getArticleBySlugAndState,
  getConfiguration,
  getNavigation,
} from "../lib/strapi";

export default function ErrorPage({ posts, meta, configuration }) {
  console.log("404 props :", {
    posts,
    meta,
    configuration,
  });

  const postRef = createRef();
  const searchRef = useRef(null);

  let post = {
    title: "Not found",
  };

  function searchHandler() {
    if (!searchRef.current) {
      return;
    }
    let text = searchRef.current.value;
    if (!text) {
      return;
    }
    searchInGoogle(text);
  }

  return <div ref={postRef}></div>;
}

export async function getStaticProps(context) {
  const slugs = await getArticlesSlugsByState();
  const posts = await Promise.all(
    slugs.map(async ({ slug }) => await getArticleBySlugAndState(slug))
  );
  const configuration = await getConfiguration();
  const bottom_nav = (await getNavigation("bottom_navigation")) || [];
  const top_nav = (await getNavigation("top_navigation")) || [];

  return {
    props: {
      posts,
      configuration,
      bottom_nav,
      top_nav,
    },
    revalidate: 60 * 60,
  };
}
