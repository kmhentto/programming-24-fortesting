import React, { Fragment } from "react"
import "../i18n"
import Helmet from "react-helmet"
import Sidebar from "../components/Sidebar"
import ContentArea from "../components/ContentArea"
import TopBar from "../components/TopBar"
import { StaticQuery, graphql, withPrefix } from "gatsby"
// import Pheromones from "../util/pheromones"
import styled from "styled-components"
import courseMetaData from "../../course-metadata.json"
import "./reboot.css"
import "./theme.css"
import "./remark.css"
import "focus-visible"
import "typeface-open-sans"
import "typeface-roboto-slab"
import "typeface-roboto-mono"
import "@fortawesome/fontawesome-svg-core/styles.css"

import { config as fontAwesomeConfig } from "@fortawesome/fontawesome-svg-core"
import Footer from "../components/Footer"
import PointsBalloon from "../components/PointsBalloon"
import {
  MEDIUM_SIDEBAR_WIDTH,
  LARGE_SIDEBAR_WIDTH,
  MEDIUM_LARGE_BREAKPOINT,
  SMALL_MEDIUM_BREAKPOINT,
} from "../util/constants"
import withSimpleErrorBoundary from "../util/withSimpleErrorBoundary"

fontAwesomeConfig.autoAddCss = false

const layoutQuery = graphql`
  query {
    title: site {
      siteMetadata {
        title
      }
    }
  }
`

const Wrapper = styled.div`
  ${(props) =>
    props.mobileMenuOpen &&
    `
    height: 100vh;
    overflow: hidden;
  `}
`

const SidebarPush = styled.div`
  @media only screen and (min-width: ${SMALL_MEDIUM_BREAKPOINT}) {
    margin-left: ${LARGE_SIDEBAR_WIDTH};
  }
  @media only screen and (max-width: ${MEDIUM_LARGE_BREAKPOINT}) {
    margin-left: ${MEDIUM_SIDEBAR_WIDTH};
  }
  @media only screen and (max-width: ${SMALL_MEDIUM_BREAKPOINT}) {
    margin-left: 0;
  }
`

const ContentWrapper = styled.div`
  margin-left: 20rem;  // Match sidebar width
  padding: 2rem;
  min-height: 100vh;

  // Improve readability
  max-width: 1200px;
  margin: 0 auto;
  line-height: 1.6;
  font-size: 16px;

  // Better spacing for content
  h1, h2, h3, h4, h5, h6 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    line-height: 1.3;
  }

  // Improve link accessibility
  a {
    color: #006fe6;
    text-decoration: underline;

    &:hover {
      color: #004c9e;
    }

    &:focus {
      outline: 2px solid #006fe6;
      outline-offset: 2px;
    }
  }

  // Better code block styling
  pre {
    background: #f7f7f9;
    padding: 1.5rem;
    border-radius: 6px;
    overflow-x: auto;
  }

  // Improve table readability
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;

    th, td {
      padding: 0.75rem;
      border: 1px solid #ddd;
    }

    th {
      background: #f7f7f9;
    }
  }
`

class Layout extends React.Component {
  state = {
    mobileMenuOpen: false,
  }

  // componentDidMount() {
  //   const user = store.get("tmc.user")
  //   if (typeof window !== "undefined" && user) {
  //     if (canDoResearch()) {
  //       setTimeout(() => {
  //         this.removePheromones = Pheromones.init({
  //           apiUrl: "https://pheromones.mooc.fi/",
  //           username: user.username,
  //           submitAfter: 20,
  //         })
  //       }, 1000)
  //     }
  //   }
  // }

  // componentWillUnmount() {
  //   if (
  //     typeof window === "undefined" ||
  //     typeof this.removePheromones === "undefined"
  //   ) {
  //     return
  //   }
  //   this.removePheromones()
  //   this.removePheromones = undefined
  // }

  toggleMobileMenu = () => {
    this.setState((prev) => {
      return {
        mobileMenuOpen: !prev.mobileMenuOpen,
      }
    })
  }

  render() {
    const { children } = this.props

    return (
      <Fragment>
        {" "}
        <StaticQuery
          query={layoutQuery}
          render={(data) => {
            const siteTitle = data.title.siteMetadata.title
            return (
              <Wrapper mobileMenuOpen={this.state.mobileMenuOpen}>
                <Helmet
                  defaultTitle={siteTitle}
                  titleTemplate={`%s - ${siteTitle}`}
                  meta={[
                    {
                      name: "description",
                      content:
                        "Learn the basics of programming with the Python programming language. The focus of the course is on programming, and you will learn how to write programs and understand how they work. For example, the basics of algorithms, control structures, subprograms, object-oriented programming are covered. The course is suitable to anyone who wants to learn programming. No prior programming experience is required.",
                    },
                    {
                      name: "keywords",
                      content:
                        "ohjelmointi, python, programming, CS1, MOOC, 2024, ohjelmointikurssi, open, free, university of helsinki",
                    },
                  ]}
                />
                <Sidebar
                  mobileMenuOpen={this.state.mobileMenuOpen}
                  toggleMobileMenu={this.toggleMobileMenu}
                />
                <SidebarPush>
                  <TopBar />
                  <ContentWrapper>
                    {children}
                  </ContentWrapper>
                  <PointsBalloon />
                  <Footer />
                </SidebarPush>
              </Wrapper>
            )
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseMetaData) }}
        />
      </Fragment>
    )
  }
}

export default withSimpleErrorBoundary(Layout)
