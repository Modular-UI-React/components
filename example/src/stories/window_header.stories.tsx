import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { WindowHeader } from '@modular-ui-react/components'
import * as WindowControlBarStories from './window_control_bar.stories'

const story: ComponentMeta<typeof WindowHeader> = {
  component: WindowHeader,
  title: 'WindowHeader'
}
export default story

type component = ComponentStory<typeof WindowHeader>

const Template: component = (args) => <WindowHeader {...args} />

export const Default: component = Template.bind({})
Default.args = {
  children: [<div key='1'>Header</div>]
}

export const SingleButtonned: component = Template.bind({})
SingleButtonned.args = {
  ...Default.args,
  options: WindowControlBarStories.SingleButtonned.args.options
}

export const DoubleButtonned: component = Template.bind({})
DoubleButtonned.args = {
  ...Default.args,
  options: WindowControlBarStories.DoubleButtonned.args.options
}

export const TripleButtonned: component = Template.bind({})
TripleButtonned.args = {
  ...Default.args,
  options: WindowControlBarStories.TripleButtonned.args.options
}

export const Empty: component = Template.bind({})
Empty.args = {}
