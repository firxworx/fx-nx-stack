import { ErrorBoundary } from './ErrorBoundary'
import { Header, NavigationLink } from './site-layout/Header'
import { Footer } from './site-layout/Footer'
import { Content } from './site-layout/Content'
import { Wrapper } from './site-layout/Wrapper'

export interface SiteLayoutProps {
  navigationLinks: Array<NavigationLink>
}

/**
 * General purpose responsive web UI layout with a header that includes a responsive navigation menu and a footer.
 */
export const SiteLayout: React.FC<SiteLayoutProps> = ({ navigationLinks, children }) => {
  return (
    <ErrorBoundary>
      <Wrapper>
        <Header navigationLinks={navigationLinks} />
        <Content>{children}</Content>
        <Footer />
      </Wrapper>
    </ErrorBoundary>
  )
}
