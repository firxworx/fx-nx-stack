/**
 * Content wrapper of SiteLayout that sets responsive max widths, padding, etc. and renders its
 * children inside of a `<main>..</main>` block.
 */
export const Content: React.FC = ({ children }) => {
  return (
    <main className="flex-1 max-w-7xl w-full px-6 xl:px-8 mx-auto">
      <div>{children}</div>
    </main>
  )
}
