import React from 'react'
import Helmet from 'react-helmet'
import { Link,graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/Layout'
import { rhythm, scale } from '../utils/typography'
import { css } from 'react-emotion'

const styles = {
  nav: css({
    display: 'flex',
    justifyContent: 'space-between',
    listStyle: 'none',
    padding: 0,
    marginLeft: 0,
    '& > li': {
      display: 'flex',
      flex: '1 0 0',
      '&.right': {
        justifyContent: 'flex-end',
        textAlign: 'right',
      },
      '&.home': {
        justifyContent: 'center',
      },
    },
    '& .item': {
      display: 'flex',
      '& > * + *': {
        marginLeft: rhythm(0.25),
      },
    },
  }),
}



const PostNav = ({ parentPath, parentTitle, next, prev, top, bottom }) =>
  <ul
    className={styles.nav}
    style={{
      marginTop: bottom ? rhythm(2) : 0,
    }}
  >
    <li className="left">
      {next && (
        <Link to={next.fields.slug} rel="prev">
          <div className="item left">
            <div>←</div> <div>{next.frontmatter.title}</div>
          </div>
        </Link>
      )}
    </li>

    <li className="home">
      <Link to={`${parentPath}`} rel="next">
        <div className="item">
          <div>{parentTitle}</div>
        </div>
      </Link>
    </li>

    <li className="right">
      {prev && (
        <Link to={prev.fields.slug} rel="next">
          <div className="item">
            <div>{prev.frontmatter.title}</div> <div>→</div>
          </div>
        </Link>
      )}
    </li>
  </ul>




class PostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const siteDescription = post.excerpt
    const { previous, next, parentPath, parentTitle } = this.props.pageContext

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${post.frontmatter.title} | ${siteTitle}`}
        />
        <div>
          <PostNav
            parentPath={parentPath}
            parentTitle={parentTitle}
            next={next}
            prev={previous}
            top
          />

          <h1
            style={{
              marginBottom: rhythm(1.5),
            }}
          >{post.frontmatter.title}</h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: 'block',
              marginBottom: rhythm(1),
              marginTop: rhythm(-1),
            }}
          >
            {post.frontmatter.date}
          </p>

          <div dangerouslySetInnerHTML={{ __html: post.html }} />

          <PostNav
            parentPath={parentPath}
            parentTitle={parentTitle}
            next={next}
            prev={previous}
            bottom
          />

        </div>
      </Layout>
    )
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM YYYY")
      }
    }
  }
`
