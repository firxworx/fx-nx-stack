export function IndexPage() {
  return (
    <div className="bg-gray-100 rounded-md mt-4 sm:mt-8">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">fx-nx-stack</span>
          <span className="block text-emerald-600">Test Index Page</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
            >
              Get started
            </a>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-emerald-600 bg-white hover:bg-emerald-50"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
