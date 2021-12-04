import React, { ErrorInfo } from 'react'

/**
 * React Error Boundary to trap errors, display a fallback, and prevent crashing the entire UI.
 *
 * This component can be modified to report errors to an API, logs, and/or metrics service.
 *
 * {@link https://reactjs.org/docs/error-boundaries.html}
 */
export class ErrorBoundary extends React.Component {
  public state = { hasError: false }

  static getDerivedStateFromError(_: Error) {
    // update state so that the next render shows the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // log error to web service here e.g. logErrorToService(error, info)
    console.error(error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 my-4 rounded-md bg-white">
          <div className="flex justify-center">
            <h1 className="mb-4 text-lg font-bold text-red-800">Error</h1>
            <p className="text-gray-800">Error loading page</p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
