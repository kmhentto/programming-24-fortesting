/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  // Check if it's a markdown file
  if (node.internal.type === `MarkdownRemark`) {
    // Add prefix to path in frontmatter
    if (node.frontmatter && node.frontmatter.path) {
      const newPath = `/programming-24${node.frontmatter.path}`
      node.frontmatter.path = newPath
    }
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions

  // createRedirect({
  //   fromPath: `/osa-1/4-muuttujat`,
  //   isPermanent: true,
  //   redirectInBrowser: true,
  //   toPath: `/osa-1/4-laskentaa`,
  // })

  const courseMaterialTemplate = path.resolve(
    `src/templates/CourseContentTemplate.js`,
  )

  const coursePartOverviewTemplate = path.resolve(
    `src/templates/CoursePartOverviewTemplate.js`,
  )

  const infoPageTemplate = path.resolve(`src/templates/InfoPageTemplate.js`)

  const vocabularyTemplate = path.resolve(`src/templates/VocabularyTemplate.js`)

  const courseInfoTemplate = path.resolve(`src/templates/CourseInfoTemplate.js`)

  const query = `
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___path] }
      limit: 1000${
        process.env.NODE_ENV === "production"
          ? `, filter: { frontmatter: { hidden: { ne: true } } }`
          : ""
      }
    ) {
      edges {
        node {
          frontmatter {
            path
            overview
            information_page
            separator_after
            upcoming
            hide_in_sidebar
            sidebar_priority
            vocabulary_page
            course_info_page
          }
        }
      }
    }
  }
    `

  return graphql(query).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    if (!result.data.allMarkdownRemark) {
      console.log("No markdown pages generated. Did you hide all of them?")
      return
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      let template = courseMaterialTemplate
      if (node.frontmatter.overview) {
        template = coursePartOverviewTemplate
      }
      if (node.frontmatter.information_page) {
        template = infoPageTemplate
      }
      if (node.frontmatter.vocabulary_page) {
        template = vocabularyTemplate
      }
      if (node.frontmatter.course_info_page) {
        template = courseInfoTemplate
      }
      if (!node.frontmatter.path) {
        // To prevent a bug that happens in development from time to time
        return;
      }
      createPage({
        path: node.frontmatter.path,
        component: template,
        context: {}, // additional data can be passed via context
      })
    })
  })
}
