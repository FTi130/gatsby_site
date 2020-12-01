import { graphql, Link, StaticQuery } from 'gatsby'
import { css } from 'emotion'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import React from 'react'
import Headroom from 'react-headroom'
import styled from 'react-emotion'
import * as colors from '../../colors'
import { rhythm } from '../utils/typography'

// const Logo = () => (
//   <StaticQuery
//     query={graphql`
//       query LogoQuery {
//         file(relativePath: { eq: "ibcaps.png" }) {
//           childImageSharp {
//             fixed(width: 25) {
//               ...GatsbyImageSharpFixed
//             }
//           }
//         }
//       }
//     `}
//     render={data => (
//       <a href="/" style={{ opacity: 1 }}>
//         <img
//           className={css({
//             marginBottom: 0,
//             marginRight: 10,
//           }).toString()}
//           src={data.file.childImageSharp.fixed.src}
//         />
//       </a>
//     )}
//   />
// )


const Outer = styled('div')`
  // box-shadow: 0px 0px 10px ${colors.primary[1]};
  background-color: ${colors.primary[1]};
  transform: translate3D(0,0,0);
  width: 100%;
  z-index: 2;
  padding: 0 ${rhythm(0.5)};
  display: flex;
  align-items: center;
  .filler {
    flex-grow: 1;
  }
  a {
    text-decoration: none !important;
    display: flex;
    color: #fff;
    padding: ${rhythm(0.3)} ${rhythm(0.5)};
    font-size: 11pt;
    cursor: pointer;
    transition: color 0.1s, background-color 0.1s; 
    &:hover {
      background-color: #ffffffc0;
      color: ${colors.primary[0]} !important;
    }
  }
  @media print {
    visibility: hidden;
    padding: 0;
  }
`

const activeLinkCss = css(`
  background-color: #ffffff20;
  color: #fff;
`)


const SocialLinksArea = styled('div')`
  display: flex;
  margin-right: ${rhythm(0.2)}; 
  & > * + * {
    margin-left: ${rhythm(0.5)}; 
  }
  a {
    padding: ${rhythm(0.3)} ${rhythm(0.3)} !important;
  }  
`

const Header = ({ postKind }) =>
  <Headroom
    className={css(`
      @media print {
        visibility: hidden;
      }
      .headroom {
        transition: opacity 0.5s;
      }
      .headroom--scrolled {
        opacity: 0.9;
      }
    `)}
  >
    <Outer>
      {/*<Logo/>*/}
      <Link
        to="/"
        className={postKind === 'project' ? activeLinkCss : undefined}
        activeClassName={activeLinkCss}>
        Projects
      </Link>

      {/*<Link to="/blog/" partiallyActive={true} activeClassName={activeLinkCss}>Blog</Link>*/}
      <Link to="/about/" activeClassName={activeLinkCss}>About</Link>
      {/*<Link to="/resume/" activeClassName={activeLinkCss}>CV</Link>*/}
      <div className="filler"/>
      <SocialLinksArea>
        <a href="https://t.me/userpav" target="_blank" rel="noopener"></a>

        <a href="https://github.com/FTi130" target="_blank" rel="noopener"><FaGithub/></a>
      </SocialLinksArea>
    </Outer>
  </Headroom>


export default Header
