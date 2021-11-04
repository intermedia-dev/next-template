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

// TODO: fix
export async function getDefaultMeta() {
  // defaultSeo {
  //   keywords
  // }
  const data = await fetchAPI(
    `query {
        global {
            siteName
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
    query PostBySlug($where: JSON) {
      articles(where: $where) {
        slug
      }
    }
    `,
    {
      variables: {
        where: {
          state: {
            state: process.env.NEXT_PUBLIC_STATE,
          },
        },
      },
    }
  );
  return data?.articles;
}

export async function getPostBySlugAndState(slug, preview) {
  const data = await fetchAPI(
    `
    query postBySlug($where: JSON) {
      articles(where: $where) {
        title
        description
        content
        slug
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
          state: { state: process.env.NEXT_PUBLIC_STATE },
          // ...(preview ? {} : { status: "published" }),
        },
      },
    }
  );

  return data?.articles[0];
}

/**
 * Retrieves post by slug, doesn't takes in consideration current (us) state.
 * Should be used only to get HomePage for (us) State, since they are not linked to State.
 * If you need post for State use getPostBySlugAndState !!
 * @param {string} slug 
 * @param {boolean} preview 
 * @returns 
 */
export async function getPostBySlug(slug, preview) {
  const data = await fetchAPI(
    `
    query postBySlug($where: JSON) {
      articles(where: $where) {
        title
        description
        content
        slug
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

export async function getConfiguration() {
  const data = await fetchAPI(
    `
    query ConfigurationByState($where: JSON) {
      configurations(where: $where) {
        state
        home_page {
          slug
        }
        components {
           ... on ComponentSectionsNav {
            name
            navigation {
              label
              slug
            }
          }
           ... on ComponentSectionsCards {
            name
            cards {
              title
              text
              slug
              icon {
                url
              }
            }
          }
        }
        code_injection
      }
    }
    `,
    {
      variables: {
        where: {
          state: process.env.NEXT_PUBLIC_STATE,
        },
      },
    }
  );

  return data?.configurations[0];
}
