module.exports = {
  siteMetadata: {
    title: `Saad Pasta Blog`,
    author: `Saad Pasta`,
    description: `A blog built on Gatsby using github issue.`,
    siteUrl: `https://gatsby-starter-blog-demo.netlify.com/`,
    social: {
      website: `saadpasta.github.io`,
      github : `github.com/saadpasta`
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    //  {
    //   resolve: "gatsby-source-graphql",
    //    options: {
    //      // This type will contain remote schema Query type
    //      typeName: "GITHUB",
    //      // This is the field under which it's accessible
    //      fieldName: "github",
    //      // URL to query from
    //      url: "https://api.github.com/graphql",
    //    },
    //  },
    // Github API 
    {
      resolve: `gatsby-source-github-api`,
      options: {
        token: btoa("ëûã¯wóMüÛ}Î´á¯[Ý®:Ý¯ß]|oG"),
        graphQLQuery: `
        query {
          repository(owner:"saadpasta",name:"DeveloperFolio"){
            issue(number:${githubIssueNumber}){
              id
              body
              title
            }
            issues(first:20, states:OPEN) {
              edges {
                node {
                  id
                  body
                  number
                  title
                  updatedAt
                  author{
                    login
                    url
                    avatarUrl
                  }
                  labels(first:5) {
                    edges {
                      node {
                        name
                      }
                    }
                    
                  }
                }
              }
            }
          }

        }
        `,
        variables: {
          githubIssueNumber:2
        }
      }
    
    }
  ],
}
