import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Window } from '@modular-ui-react/components'
import * as WindowHeaderStories from './window_header.stories'
import * as WindowBodyStories from './window_body.stories'

const story: ComponentMeta<typeof Window> = {
  component: Window,
  title: 'Window'
}
export default story

type component = ComponentStory<typeof Window>

const Template: component = (args) => <Window {...args} />

export const Default: component = Template.bind({})
Default.args = {
  children: WindowBodyStories.Default.args.children
}

export const SingleButtonned: component = Template.bind({})
SingleButtonned.args = {
  ...Default.args,
  options: {
    ...WindowHeaderStories.SingleButtonned.args.options,
    header: WindowHeaderStories.SingleButtonned.args.children
  }
}

export const DoubleButtonned: component = Template.bind({})
DoubleButtonned.args = {
  ...Default.args,
  options: {
    ...SingleButtonned.args.options,
    ...WindowHeaderStories.DoubleButtonned.args.options
  }
}

export const TripleButtonned: component = Template.bind({})
TripleButtonned.args = {
  ...Default.args,
  options: {
    ...DoubleButtonned.args.options,
    ...WindowHeaderStories.TripleButtonned.args.options
  }
}

export const Empty: component = Template.bind({})
Empty.args = {}
