const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        githubData {
          data {
            repository {
              issues {
                edges {
                  node {
                    id
                    body
                    title
                    updatedAt(formatString: "DD/MM/YYYY")
                    author {
                      avatarUrl
                      login
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  )


  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.githubData.data.repository.issues.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    console.log("====>",post)
    createPage({
      path: post.node.title,
      component: blogPost,
      context: {
        slug: post.node.title,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
