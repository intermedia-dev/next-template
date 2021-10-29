import { useRouter } from "next/router";
import Head from "next/head";
import PostBody from "../components/PostBody";
import PostHeader from "../components/PostHeader";
import {
  getAllPostsWithSlug,
  getPostBySlug,
  getDefaultMeta,
  getConfiguration,
} from "/lib/strapi";
import markdownToHtml from "../lib/markdownToHtml";

export default function Post({ post, preview }) {
  const router = useRouter();
  return (
    <div>
      {router.isFallback ? (
        <PostBody>Loading…</PostBody>
      ) : (
        <>
          <article>
            <Head>
              <title>{post.title}</title>
            </Head>
            <PostHeader title={post.title} />
            <PostBody content={post.content} />
          </article>
        </>
      )}
    </div>
  );
}

export async function getStaticProps({ params: { slug }, preview = null }) {
  const post = await getPostBySlug(slug, preview);
  const content = await markdownToHtml(post.content || "");
  const meta = await getDefaultMeta();
  const configuration = await getConfiguration();

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: {
        post,
        content,
      },
      meta,
      preview,
      configuration,
    },
    revalidate: 60 * 3,
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  const paths = allPosts.map((el) => ({ params: { slug: el.slug } }));
  return {
    paths,
    fallback: true,
  };
}
