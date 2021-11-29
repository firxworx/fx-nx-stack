import { Story, Meta } from '@storybook/react'
import { Example } from './Example'

export default {
  component: Example,
  title: 'Example',
} as Meta

const Template: Story = (args) => <Example {...args} />

export const Primary = Template.bind({})
Primary.args = {}
