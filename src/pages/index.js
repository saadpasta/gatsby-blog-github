import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const githubPosts = data.githubData.data.repository.issues
    console.log(githubPosts)
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        {githubPosts.edges.map(({ node }) => {
          const title = node.title || node.fields.slug
          return (
            <article
              key={node.title}
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <h1 style={{
                color:'#7b7b7b'
              }}>#code</h1>
              <div
              style={{
                width : rhythm(25)
              }}
              >
                <header>
                  <h3
                    style={{
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    <Link style={{ boxShadow: `none` }} to={node.title}>
                      {title}
                    </Link>
                  </h3>
                  <small>{node.updatedAt}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.body || node.excerpt,
                    }}
                  />
                </section>
              </div>
            </article>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
    githubData {
      data {
        repository {
          issues {
            edges {
              node {
                
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
