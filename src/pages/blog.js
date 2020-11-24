import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'react-emotion'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import colors from '../../colors'

import Layout, { getBreakPoint } from '../components/Layout'
import { rhythm } from '../utils/typography'

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Posts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  & > * + * {
    margin-top: ${rhythm(0.5)};
  }
`
const PostTitleRow = styled.div`
  display: flex;
  align-items: center;
  & > * + * {
    margin-left: ${rhythm(0.5)};
  }
`
const PostDate = styled.div`
  font-size: ${rhythm(0.5)};
  white-space: nowrap;
  color: ${colors.primary[3]};
`
const PostTitle = styled.div`
  font-size: ${rhythm(0.75)};
  font-weight: bold;
  color: ${colors.primary[2]};
`

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        <Outer>
          <Posts>
          {posts.map(({ node }) => {
            const title = get(node, 'frontmatter.title') || node.fields.slug
            const date = get(node, 'frontmatter.date')
            return (
              <Link
                key={node.fields.slug}
                style={{ boxShadow: 'none' }}
                to={node.fields.slug}
              >
                <PostTitleRow>
                  <PostDate>{date}</PostDate>
                  <PostTitle>{title}</PostTitle>
                </PostTitleRow>
              </Link>
            )
          })}
          </Posts>
        </Outer>
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
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC },
      filter: {frontmatter: {kind: {eq: "blog"}}}
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMM YYYY")
            title
          }
        }
      }
    }
  }
`
