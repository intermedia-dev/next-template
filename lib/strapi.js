async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

export async function getDefaultMeta() {
  const data = await fetchAPI(
    `query {
        global {
            siteName
            defaultSeo {
                keywords
            }
            favicon {
                url
            }
        }
    }`
  );

  return data.global;
}

export async function getPreviewPostBySlug(slug) {
  const data = await fetchAPI(
    `
    query PostBySlug($where: JSON) {
      articles(where: $where) {
        slug
      }
    }
    `,
    {
      variables: {
        where: {
          slug,
        },
      },
    }
  );
  return data?.articles[0];
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(
    `
    query PostBySlug($where_ne: JSON) {
      articles(where: $where_ne) {
        slug
      }
    }
    `,
    {
      variables: {
        where: {
          category: {
            slug: {
              ne: "hidden",
            },
          },
        },
      },
    }
  );
  return data?.articles;
}

export async function getPostBySlug(slug, preview) {
  const data = await fetchAPI(
    `
    query postBySlug($where: JSON) {
      articles(where: $where) {
        title
        description
        content
        slug
        category {
          id
        }
        image {
          url
        }
      }
    }
  `,
    {
      preview,
      variables: {
        where: {
          slug,
          // ...(preview ? {} : { status: "published" }),
        },
      },
    }
  );

  return data?.articles[0];
}

export async function getAllPostsForHome(preview) {
  // const data = await fetchAPI(
  //   `
  //     query Posts($where: JSON){
  //       articles(sort: "date:desc", limit: 10, where: $where) {
  //           title
  //           slug
  //           post_url
  //           content
  //       }
  //     }
  //   `,
  //   {
  //     variables: {
  //       where: {
  //         ...(preview ? {} : { status: "published" }),
  //       },
  //     },
  //   }
  // );
  const data = await fetchAPI(
    `
    query {
        articles(limit: 10) {
            title
            slug
            content
        }
      }
      `
  );
  return data?.articles;
}

export async function getConfiguration() {
  const data = await fetchAPI(
    `
    query ConfigurationByState($where: JSON) {
      configurations(where: $where) {
        homepage_slug
        top_navigation {
          label
          slug
        }
        bottom_navigation {
          label
          slug
        }
        cards {
          title
          text
          slug
          icon {
            url
          }
        }
        code_injection
      }
    }
    `,
    {
      variables: {
        where: {
          state: process.env.NEXT_PUBLIC_STATE || "california",
        },
      },
    }
  );

  return data?.configurations[0];
}
