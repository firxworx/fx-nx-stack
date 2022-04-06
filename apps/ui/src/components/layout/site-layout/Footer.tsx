import Link from 'next/link'

/**
 * Footer of SiteLayout.
 */
export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t-2 border-gray-200">
      <div className="container mx-auto text-center p-4">
        <span className="text-sm font-medium leading-none text-gray-500">
          <Link href="https://github.com/firxworx/fx-nx-stack">
            <a className="hover:underline">fx-nx-stack</a>
          </Link>
        </span>
      </div>
    </footer>
  )
}
