import React, { useContext } from "react"
import styled from "styled-components"
import BackgroundImage from "../images/banner.svg"
import { Card, CardContent } from "@material-ui/core"
import { withTranslation } from "react-i18next"
import withSimpleErrorBoundary from "../util/withSimpleErrorBoundary"
import CourseSettings from "../../course-settings"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import PagesContext from "../contexes/PagesContext"

const StyledIcon = styled(FontAwesomeIcon)`
  color: black;
  margin-bottom: 1rem;
  margin: 1rem;
`

const SocialContainer = styled.div``

const ContentContainer = styled.div`
  padding: 1rem 0;
`

const GithubContainer = styled.div`
  padding-top: 1rem;
  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const ButtonContainer = styled.div`
  padding: 1rem 0;
`

const FooterWrapper = styled.footer`
  height: 35rem;
  position: relative;
  a {
    color: #006fe6;
  }
`

const FooterBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: url(${BackgroundImage});
  filter: invert(1) grayscale(1) brightness(1.5) opacity(0.5);
  z-index: -50000;
`

const FooterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const StyledCard = styled(Card)`
  width: 90%;
  max-width: 800px;
`

const StyledCardContent = styled(CardContent)`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Footer = ({ t }) => {
  const pagesContextValue = useContext(PagesContext)
  const filePath = pagesContextValue?.current?.filePath

  return (
    <FooterWrapper>
      <FooterBackground />
      <FooterContent>
        <StyledCard>
          <StyledCardContent>
            <GithubContainer>
              <a
                href={CourseSettings.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <StyledIcon icon={faGithub} size="3x" title={t("footer-src")} />
                <div>{t("footer-src")}</div>
              </a>
            </GithubContainer>
          </StyledCardContent>
        </StyledCard>
        <StyledCard>
          <StyledCardContent>
            <ContentContainer>
              <p>© {new Date().getFullYear()} {CourseSettings.name}</p>
              <p>
                <a
                  href="https://github.com/dipaish/programming-24/blob/main/license.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apache License, Version 2.0 & Creative Commons BY-NC-SA 4.0
                </a>
              </p>
            </ContentContainer>
          </StyledCardContent>
        </StyledCard>
        <StyledCard>
          <StyledCardContent>
            <ContentContainer>
              <p>This content has been tailored for the Fundamentals of Programming course at Laurea University of Applied Sciences by </p>
              <p>: <a href="https://github.com/dipaish" target="_blank" rel="noopener noreferrer">Deepak Chhetri</a> and <a href="https://github.com/kmhentto" target="_blank" rel="noopener noreferrer">Katja Henttonen</a></p>
            </ContentContainer>
          </StyledCardContent>
        </StyledCard>
      </FooterContent>
    </FooterWrapper>
  )
}

export default withTranslation("common")(withSimpleErrorBoundary(Footer))
