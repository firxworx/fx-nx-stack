import { ErrorBoundary } from './ErrorBoundary'
import { Header } from './site-layout/Header'
import { Footer } from './site-layout/Footer'
import { Content } from './site-layout/Content'
import { Wrapper } from './site-layout/Wrapper'

/**
 * General purpose responsive web UI layout with header + footer.
 */
export const SiteLayout: React.FC = ({ children }) => {
  return (
    <ErrorBoundary>
      <Wrapper>
        <Header />
        <Content>{children}</Content>
        <Footer />
      </Wrapper>
    </ErrorBoundary>
  )
}
