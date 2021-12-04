/**
 * Wrapper component for children of SiteLayout that resets z-index and defines the base flex column layout.
 */
export const Wrapper: React.FC = ({ children }) => {
  return <div className="h-screen z-0 flex flex-col bg-white">{children}</div>
}
