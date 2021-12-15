async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.STRAPI_URL}/graphql`, {
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

export async function getArticleBySlugAndState(slug, preview = false) {
  const data = await fetchAPI(
    `
      query ArticleBySlugAndState($where: JSON) {
        articles(where: $where, ${preview ? "publicationState: PREVIEW" : ""}) {
            slug
            title
            description
            content
            created_at
            updated_at
            slug
            image {
                url
                name
                alternativeText
                }
            meta_title
            meta_description
            meta_keywords
            published_at
        }
      }
    `,
    {
      variables: {
        where: {
          slug,
          state: { state: process.env.NEXT_PUBLIC_STATE },
        },
      },
    }
  );

  // TODO: @Maxim
  // const article = data?.articles[0]
  // if (article) {
  //   const html = markdownToHtml.makeHtml(article.content);
  //   const tableOfContent = getTableOfContent(html);
  //   return {
  //     ...article,
  //     html,
  //     tableOfContent,
  //   }
  // }
  // return null; || {}

  return data?.articles[0];
}

export async function getArticlesSlugsByState(preview = false) {
  const data = await fetchAPI(
    `
      query ArticlesSlugsByState($where: JSON, ${
        preview ? "publicationState: PREVIEW" : ""
      }) {
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

/**
 * Retrieves post by slug, doesn't takes in consideration current (us) state.
 * Should be used only to get HomePage for (us) State, since they are not linked to State.
 * If you need post for State use getPostBySlugAndState !!
 *
 * @deprecated !!!
 * !!! Use getHomePageByState to get HomePage for current (us) State.
 * @param {string} slug
 * @param {boolean} preview
 * @returns
 */
export async function getPostBySlug(slug, preview) {
  const data = await fetchAPI(
    `
      query PostBySlug($where: JSON) {
        articles(where: $where,  ${
          preview ? "publicationState: PREVIEW" : ""
        }) {
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
      variables: {
        where: {
          slug,
        },
      },
    }
  );

  return data?.articles[0];
}

export async function getBlogsByState(preview = false) {
  const data = await fetchAPI(
    `query BlogsByState($where: JSON) {
            configurations(where: $where, ${
              preview ? "publicationState: PREVIEW" : ""
            }) {
                blog_posts {
                  isFeatured
                  slug
                  title
                  description
                  content
                  created_at
                  updated_at
                  slug
                  image {
                      url
                      name
                      alternativeText
                      }
                  meta_title
                  meta_description
                  meta_keywords
                  published_at
                }
            }
        }`,
    {
      variables: {
        where: {
          state: process.env.NEXT_PUBLIC_STATE,
        },
      },
    }
  );

  return data?.configurations[0]?.blog_posts;
}

export async function getHomePageByState() {
  const data = await fetchAPI(
    `query HomePageByState($where: JSON) {
            configurations(where: $where) {
                home_page {
                    slug
                    title
                    description
                    content
                    created_at
                    updated_at
                    slug
                    image {
                        url
                        name
                        alternativeText
                        }
                    meta_title
                    meta_description
                    meta_keywords
                    published_at
                }
            }
        }`,
    {
      variables: {
        where: {
          state: process.env.NEXT_PUBLIC_STATE,
        },
      },
    }
  );

  // @Maxim
  // if (data?.configurations[0]?.home_page) {
  //   const html = markdownToHtml.makeHtml(data?.configurations[0]?.home_page.content);
  //   const tableOfContent = getTableOfContent(html);
  //   return {
  //     ...data.configurations[0].home_page,
  //     html,
  //     tableOfContent,
  //   }
  // }
  // return null; || {}

  return data?.configurations[0]?.home_page;
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
          header_logo{
            url
            alternativeText
          }
          footer_logo{
            url
            alternativeText
          }
          phone_number
          siteName
          googleScriptBody
          googleScriptHead
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

export async function getComponentsByState(preview = false) {
  const data = await fetchAPI(
    `
      query ComponentsByState($where: JSON) {
        configurations(where: $where, ${
          preview ? "publicationState: PREVIEW" : ""
        }) {  
          components {
            __typename
          
            ... on ComponentSectionsBanner {
              desktop_image {
                url
                alternativeText
              }
              mobile_image {
                url
                alternativeText
              }
              person_image {
                url
                alternativeText
              }
              main_text
              bottom_text
            }
            
            ...on ComponentSectionsFaq {
              title
              content {
                title
                content
              }
            }
                
            ...on ComponentSectionsSidebarWithImages {
              name
              title
              images {
                url
                alternativeText
              }
            }
            
            ...on ComponentSectionsSidebarWithLinks {
              title
              image {
                url
                alternativeText
              }
              links{
                url
                label
              }
            }
            
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

  return data?.configurations[0]?.components || [];
}

export async function getNavigation(name) {
  const components = await getComponentsByState();
  return components.find((component) => component.name === name)
    ?.navigation;
}

export async function getCards(name) {
  const components = await getComponentsByState();
  return components.find((component) => component.name === name)
    ?.cards;
}

export async function getBanner() {
  const components = await getComponentsByState();
  return components.find((component) => component.__typename === 'ComponentSectionsBanner');
}

export async function getSidebarWithImages(name) {
  const components = await getComponentsByState();
  return components
    .filter(component => component.__typename === 'ComponentSectionsSidebarWithImages')
    .find(component => component.name === name);
}

export async function getSidebarWithLinks() {
  const components = await getComponentsByState();
  return components
    .find(component => component.__typename === 'ComponentSectionsSidebarWithLinks')
}

export async function getFaq() {
  const components = await getComponentsByState();
  return components
    .find(component => component.__typename === 'ComponentSectionsFaq')
}
