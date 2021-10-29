import React, { createRef, useRef } from "react";
import { getConfiguration, getDefaultMeta, getPosts } from "../lib/strapi";

export default function ErrorPage({ posts, meta, configuration }) {
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
  let posts = await getPosts();
  let meta = await getDefaultMeta();
  let configuration = await getConfiguration();

  return {
    props: {
      posts,
      meta,
      configuration,
    },
    revalidate: 60 * 60,
  };
}
