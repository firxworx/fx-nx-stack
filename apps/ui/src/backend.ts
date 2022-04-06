import { EventEmitter } from 'events'

export const BASE_URL = process.env.NEXT_PUBLIC_APP_API_BASE_URL

export const EVENT_AUTH_ERROR = 'authError'
export const EVENT_NETWORK_ERROR = 'networkError'

// error emitter singleton
let backendEvents: EventEmitter | null = null
export function getBackendEvents() {
  if (!backendEvents) {
    backendEvents = new EventEmitter()
  }
  return backendEvents
}

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...(options ?? {}),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include', // cors - include cookies in request
    })

    // respond to 401 response by emitting an auth error event to signal app handlers
    if (response.status === 401) {
      getBackendEvents().emit(EVENT_AUTH_ERROR)
    }

    // attempt to parse any response that's not 204 (no content) as json
    const responseJson = response.status === 204 ? {} : await response.json()

    if (!responseJson) {
      throw new Error(`Fetch error <${response.status}> - <${path}>: failed to parse expected json response data`)
    }

    if (!response.ok) {
      // avoid emitting a network error event for POST requests that receive a 400 response
      // (i.e. bad request response errors resulting from a typical form/data POST request should not trigger a network error)
      if (options?.method === 'POST' && response.status === 400) {
        // returning an error via Promise.reject will not trip the catch block
        return Promise.reject(new Error(String(responseJson?.message ?? 'Data submission error')))
      }

      throw new Error(`Fetch error (${response.status}): ${JSON.stringify(responseJson)}`)
    }

    return responseJson as T
  } catch (error: unknown) {
    // emit a network error event to signal app handlers
    getBackendEvents().emit(EVENT_NETWORK_ERROR)

    // return rejected promise to report this error to caller
    return Promise.reject(error)
  }
}

export async function signIn(email: string, password: string) {
  return apiFetch(`/auth/sign-in`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  })
}
