import React from "react"
import styled from "styled-components"
import { graphql, StaticQuery } from "gatsby"
import { Button } from "@material-ui/core"
import CourseSettings from "../../course-settings"

import TreeView from "./TreeView"
import withSimpleErrorBoundary from "../util/withSimpleErrorBoundary"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import {
  MEDIUM_LARGE_BREAKPOINT,
  SMALL_MEDIUM_BREAKPOINT,
  MEDIUM_SIDEBAR_WIDTH,
  LARGE_SIDEBAR_WIDTH,
} from "../util/constants"

const StyledIcon = styled(FontAwesomeIcon)`
  vertical-align: middle;
  margin-right: 0.5em;
  margin-left: 0.1em;
  color: var(--color);
  font-size: 1.5em;
`

const StyledSidebar = styled.div`
  background-color: #f7f7f9;
  padding: 2rem;
  height: 100%;
  width: 20rem;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  overflow-y: auto;

  scroll-behavior: smooth;

  a:focus {
    outline: 2px solid #006fe6;
    outline-offset: 2px;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
`

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`

const NavItem = styled(Link)`
  color: #333;
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e7e7e9;
    transform: translateX(4px);
  }

  &[aria-current="page"] {
    background-color: #006fe6;
    color: white;
  }
`

const Brand = styled.div`
  width: 100%;
  text-align: center;
  padding: 1em;
  padding-top: 2em;
  font-weight: bold;
  color: #c0392b;
  font-size: 1.15em;
`

const MenuExpanderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1em;
  @media only screen and (min-width: ${SMALL_MEDIUM_BREAKPOINT}) {
    display: none;
  }
`

const MobileWrapper = styled.div`
  @media only screen and (max-width: ${SMALL_MEDIUM_BREAKPOINT}) {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999999;
    overflow-y: scroll;
    background-color: white;
  }
`

const MobileWrapperOrFragment = (props) => {
  if (props.mobileMenuOpen) {
    return <MobileWrapper {...props} />
  }
  return <div>{props.children}</div>
}

const Sidebar = (props) => {
  let edges =
    props.data?.allMarkdownRemark?.edges.map((o) => o.node?.frontmatter) || []
  if (process.env.NODE_ENV === "production") {
    edges = edges.filter((o) => !o.hidden)
  }

  edges = edges
    .filter((o) => !o.hide_in_sidebar)
    .sort((a, b) => {
      if (a.sidebar_priority !== b.sidebar_priority) {
        return (a.sidebar_priority || 10000) - (b.sidebar_priority || 10000);
      }
      return a.title.localeCompare(b.title, undefined, {
        numeric: true,
        sensitivity: "base",
      });
    })

  let coursePartEdges = edges.filter(
    (o) => !o.information_page && !o.course_info_page && !o.upcoming,
  )

  let informationPageEdges = edges
    .filter((o) => o.information_page || o.course_info_page)
    .sort((a, b) => b.sidebar_priority - a.sidebar_priority)

  let upcomingPageEdges = edges
    .filter((o) => o.upcoming)
    .map((o) => ({
      title: o.title,
      tba: o.upcoming,
      path: o.path,
      separator_after: o.separator_after,
    }))

  let content = informationPageEdges
    .concat(coursePartEdges)
    .concat(upcomingPageEdges)

  let separatorEdges = []
  content.forEach((edge) => {
    if (edge.separator_after) {
      separatorEdges.push(edge)
    }
  })

  separatorEdges.forEach((edge) => {
    let middlepoint = content.findIndex((o) => o.title === edge.title)
    content.splice(middlepoint + 1, 0, {
      separator: true,
      title: edge.separator_after,
    })
  })

  return (
    <MobileWrapperOrFragment mobileMenuOpen={props.mobileMenuOpen}>
      <MenuExpanderWrapper>
        <Button
          variant="outlined"
          color="primary"
          onClick={props.toggleMobileMenu}
        >
          {props.mobileMenuOpen ? (
            <span>
              <StyledIcon icon={faTimes} />
              Sulje valikko
            </span>
          ) : (
            <span>
              <StyledIcon icon={faBars} />
              Avaa valikko
            </span>
          )}
        </Button>
      </MenuExpanderWrapper>
      <StyledSidebar>
        <Brand>{CourseSettings.name}</Brand>
        <Navigation role="navigation" aria-label="Main navigation">
          <TreeView data={content} />
        </Navigation>
      </StyledSidebar>
    </MobileWrapperOrFragment>
  )
}

const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/index.md|data/[^/]+/*.md/" } }
      sort: { fields: [frontmatter___path] }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            information_page
            course_info_page
            path
            hidden
            separator_after
            upcoming
            hide_in_sidebar
            sidebar_priority
          }
        }
      }
    }
  }
`

const SidebarWithData = (props) => (
  <StaticQuery
    query={query}
    render={(data) => <Sidebar data={data} {...props} />}
  />
)

export default withSimpleErrorBoundary(SidebarWithData)
