import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { WindowControlBar } from '@modular-ui-react/components'
import { FaTimesCircle } from 'react-icons/fa'

const story: ComponentMeta<typeof WindowControlBar> = {
  component: WindowControlBar,
  title: 'WindowControlBar'
}
export default story

type component = ComponentStory<typeof WindowControlBar>

const Template: component = (args) => <WindowControlBar {...args} />

export const Default: component = Template.bind({})
Default.args = {}

export const SingleButtonned: component = Template.bind({})
SingleButtonned.args = {
  ...Default.args,
  options: {
    hasDragButton: false,
    hasMinimizeButton: false,
    hasCloseButton: true,
    closeIcon: <FaTimesCircle />
  },
  lifecycle: {
    onWindowClose: () => console.log('onWindowClose()')
  }
}

export const DoubleButtonned: component = Template.bind({})
DoubleButtonned.args = {
  ...Default.args,
  options: {
    hasDragButton: false,
    hasMinimizeButton: true,
    hasCloseButton: true
  }
}

export const TripleButtonned: component = Template.bind({})
TripleButtonned.args = {
  ...Default.args,
  options: {
    hasDragButton: true,
    hasMinimizeButton: true,
    hasCloseButton: true
  }
}

export const Empty: component = Template.bind({})
Empty.args = {}
