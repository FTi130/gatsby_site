import React from 'react'
import styled from 'react-emotion'
import { rhythm } from '../utils/typography'
import Sidebar from './Sidebar'
import Header from './Header'

const Container = styled('div')(({ breakpoint }) => `
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(24)};
  & > * + * {
    margin-top: ${rhythm(1)};
  }
  @media (min-width: ${rhythm(breakpoint)}) {
    max-width: ${rhythm(80)};
    padding-left: ${rhythm(2)};
    padding-right: ${rhythm(2)};
  }
  @media (max-width: ${rhythm(breakpoint)}) {
    max-width: ${rhythm(breakpoint)};
    flex-direction: ${'column'};
    padding-bottom: 0;
    padding-left: ${rhythm(0.5)};
    padding-right: ${rhythm(0.5)};
  }
  @media print {
    padding: 0;
    margin-left: 0;
    margin-right: 0;
  }
`)

const Sidebars = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
    margin-top: ${rhythm(1.75)};
    & > * + * {
      margin-top: ${rhythm(0.5)};
    }
    margin-left: ${rhythm(1)}; 
    margin-right: ${rhythm(1)};
`

const SidebarContainer = styled('div')`
  display: flex;
  // flex: 1 0 0;
  // justify-content: center;
  // margin-top: ${rhythm(1)};
  // border: 1px solid red;
  text-align: center;
`

const ContentContainer = styled('div')(({ breakpoint }) => `
  padding: ${rhythm(1.5)} ${rhythm(0.5)};
  @media (min-width: ${rhythm(breakpoint)}) {
    padding: ${rhythm(1.4)} ${rhythm(6)};
  }
  @media print {
    padding: 0;
  }
`)

const LargeText = styled('div')`
  font-size: ${rhythm(0.65)};  
`


const Layout = (props) => {
  const {
    breakpoint = 57,
    location,
    children,
  } = props
  const path = location.pathname
  const postKind = (
    path.startsWith('/talks/') ? 'talks' :
    path.startsWith('/blog/') ? 'blog' :
    path.startsWith('/p/') ? 'project' : undefined
  )
  const rootPath = `${__PATH_PREFIX__}/`
  const isHome = (path === rootPath)
  return (
    <React.Fragment>
      <Header postKind={postKind} />
      <Container breakpoint={breakpoint}>
        {isHome &&
        <Sidebars>
          <SidebarContainer left>
            <Sidebar />
          </SidebarContainer>
          <SidebarContainer right>
            <LargeText style={{marginTop:rhythm(0.5) }}>
            {/*I design and develop interactive data visualizations for the web.*/}
            I develop interactive data visualizations and maps.
            </LargeText>
          </SidebarContainer>
        </Sidebars>
        }
        <ContentContainer breakpoint={breakpoint}>
          {children}
        </ContentContainer>
      </Container>
    </React.Fragment>
  )
}

export default Layout
