const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')


function createPostPage(createPage, graphql, kind, parentPath, parentTitle) {
  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('./src/templates/post.js')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___sticky, frontmatter___date], order: [ASC,DESC] }, limit: 1000,
              filter: {frontmatter: {kind: {eq: "${kind}"}}}
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges;

        _.each(posts, (post, index) => {
          const previous = index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;

          createPage({
            path: post.node.fields.slug,
            component: postTemplate,
            context: {
              slug: post.node.fields.slug,
              previous,
              kind,
              parentPath,
              parentTitle,
              next,
            },
          })
        })
      })
    )
  });
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return Promise.all([
    createPostPage(createPage, graphql,  'project', '/', 'Projects'),
    createPostPage(createPage, graphql,  'talk', '/talks/', 'Talks'),
    createPostPage(createPage, graphql,  'blog', '/blog/', 'Blog posts'),
    new Promise((resolve, reject) => {
      const pageTemplate = path.resolve('./src/templates/page.js')
      resolve(
        graphql(
          `
            {
              allMarkdownRemark(
                sort: { fields: [frontmatter___date], order: DESC }, limit: 1000,
                filter: {frontmatter: {kind: {eq: "page"}}}
              ) {
                edges {
                  node {
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                    }
                  }
                }
              }
            }
          `
        ).then(result => {
          if (result.errors) {
            console.log(result.errors)
            reject(result.errors)
          }

          // Create blog posts pages.
          const posts = result.data.allMarkdownRemark.edges;

          _.each(posts, (post, index) => {
            createPage({
              path: post.node.fields.slug,
              component: pageTemplate,
              context: {
                slug: post.node.fields.slug,
              },
            })
          })
        })
      )
    }),

  ])
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
