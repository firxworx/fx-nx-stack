import React, { useRef, useEffect } from 'react'

/**
 * React hook that returns a ref with value `true` when its enclosing component is mounted and `false` when unmounted.
 *
 * It is a good practice to confirm that a component is mounted before attempting to update its state to avoid
 * warnings, memory leaks, and other potential issues.
 *
 * Use this hook if there is a risk of a delayed call to set component state that could be triggered
 * after the component is unmounted (e.g. user navigated away).
 *
 * Usage:
 *
 * ```ts
 * const isMountedRef = useIsMountedRef()
 * // ...
 * // e.g. inside a callback function or effect:
 * if (isMountedRef.current) {
 *   // safely run code e.g. that manipulates component state
 * }
 * ```
 *
 * @returns a ref with a boolean indicating if the containing component is mounted
 */
export const useIsMountedRef = (): React.MutableRefObject<boolean> => {
  const isMountedRef = useRef(true)

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  return isMountedRef
}
