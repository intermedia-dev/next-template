import { useRouter } from "next/router";
import Head from "next/head";
import PostHeader from "../components/PostHeader";
import { PostContent } from "../components";
import {
  getArticleBySlugAndState,
  getConfiguration,
  getNavigation,
} from "/lib/strapi";

export default function Post({ post, meta, preview, configuration }) {
  const router = useRouter();
  return (
    <div>
      {router.isFallback ? (
        <PostContent content={"Loading…"} />
      ) : (
        <>
          <article>
            <Head>
              <title>{post.title}</title>
            </Head>
            <PostHeader title={post.title} />
            <PostContent content={post.content} />
          </article>
        </>
      )}
    </div>
  );
}

export async function getStaticProps({ params: { slug }, preview = null }) {
  const post = await getArticleBySlugAndState(slug, preview);
  const configuration = await getConfiguration();
  const bottom_nav = (await getNavigation("bottom_navigation")) || [];
  const top_nav = (await getNavigation("top_navigation")) || [];

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
      preview,
      configuration,
      bottom_nav,
      top_nav,
    },
    revalidate: 60 * 3,
  };
}

export async function getStaticPaths() {
  const posts = await getArticlesSlugsByState();

  const paths = posts.map((el) => ({ params: { slug: el.slug } }));
  return {
    paths,
    fallback: true,
  };
}
