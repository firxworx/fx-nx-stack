import { Fragment } from 'react'
import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'

import { MenuIcon, XIcon } from '@heroicons/react/outline'

import { Logo } from '../../brand/Logo'

export interface NavigationLink {
  name: string
  href: string
}

export interface HeaderProps {
  navigationLinks: Array<NavigationLink>
}

/**
 * Header of SiteLayout that displays branding and implements responsive navigation menu.
 */
export const Header: React.FC<HeaderProps> = ({ navigationLinks }) => {
  return (
    <Popover as="header" className="relative">
      {({ open }) => (
        <>
          <div className="bg-gray-100 border-b-2 border-gray-200">
            <nav
              className="relative max-w-7xl mx-auto flex items-center justify-between py-4 px-6 xl:px-8"
              aria-label="Main"
            >
              <div className="flex items-center flex-1">
                <div className="flex items-center justify-between w-full lg:w-auto">
                  <Link href="/">
                    <a>
                      <span className="sr-only">App Home</span>
                      <Logo className="h-8 w-auto sm:h-10 text-green-600" />
                    </a>
                  </Link>
                  <div className="-mr-2 flex items-center lg:hidden">
                    <Popover.Button className="bg-gray-50 border-2 border-gray-200 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-blue-100">
                      <span className="sr-only">Open Navigation Menu</span>
                      <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="hidden space-x-10 lg:flex lg:ml-10">
                  {navigationLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-base font-medium text-gray-500 hover:text-gray-900"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="hidden lg:flex lg:items-center lg:space-x-6">
                <Link href="/sign-in">
                  <a className="py-2 px-6 bg-gray-100 border-2 border-gray-200 rounded-md text-base font-medium text-gray-900 hover:bg-gray-200">
                    Login
                  </a>
                </Link>
              </div>
            </nav>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              static
              className="absolute z-30 top-0 inset-x-0 transition transform origin-top-right lg:hidden"
            >
              <div className="rounded-b-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div>
                    <Logo className="h-8 sm:h-10 w-auto text-green-600" />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-100">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="pt-5 pb-6">
                  <div className="px-2 space-y-1">
                    {navigationLinks.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6 px-5">
                    <Link href="/sign-in">
                      <a className="block text-center w-full py-2 px-4 border border-transparent rounded-md shadow bg-gray-500 text-white font-medium hover:bg-gray-600">
                        Login
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
