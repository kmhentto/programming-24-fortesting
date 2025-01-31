import React, { useContext } from "react"
import { withTranslation } from "react-i18next"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PagesContext from "../context/PagesContext"
import CourseSettings from "../../course-settings"
import withSimpleErrorBoundary from "../util/withSimpleErrorBoundary"
import {
  FooterWrapper,
  FooterBackground,
  FooterContent,
  StyledCard,
  StyledCardContent,
  GithubContainer,
  StyledIcon,
} from "./FooterStyles"

const Footer = ({ t }) => {
  const pagesContextValue = useContext(PagesContext)
  const filePath = pagesContextValue?.current?.filePath

  return (
    <FooterWrapper>
      <FooterBackground />
      <FooterContent>
        <StyledCard>
          <StyledCardContent>
            <div>
              <a
                href={CourseSettings.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <StyledIcon icon={faGithub} size="3x" title={t("footer-src")} />
                <div>{t("footer-src")}</div>
              </a>
            </div>
            <div>
                <a
                  href="https://github.com/dipaish/programming-24/blob/main/license.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  © {new Date().getFullYear()} Apache License, Version 2.0 & Creative Commons BY-NC-SA 4.0
                </a>
            </div>
            <div>
              <p>his content has been tailored for the Fundamentals of Programming course at Laurea University of Applied Sciences by:<a href="https://github.com/dipaish" target="_blank" rel="noopener noreferrer">Deepak Chhetri</a> and <a href="https://github.com/kmhentto" target="_blank" rel="noopener noreferrer">Katja Henttonen</a></p>
            </div>
          </StyledCardContent>
        </StyledCard>
      </FooterContent>
    </FooterWrapper>
  )
}

export default withTranslation("common")(withSimpleErrorBoundary(Footer))
