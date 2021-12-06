import { render } from '@testing-library/react'
import { useIsMountedRef } from '../lib/use-is-mounted-ref'

const TestComponent: React.FC = () => {
  const isMountedRef = useIsMountedRef()

  return <div />
}

// @todo - additional tests of component behaviour
describe('useIsMountedRef', () => {
  it('does not interfere with host component reder', () => {
    const { baseElement } = render(<TestComponent />)
    expect(baseElement).toBeTruthy()
  })
})
