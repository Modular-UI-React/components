import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TabbedPanelBody } from '@modular-ui-react/components'
import * as WindowBodyStories from './window_body.stories'

const story: ComponentMeta<typeof TabbedPanelBody> = {
  component: TabbedPanelBody,
  title: 'TabbedPanelBody'
}
export default story

type component = ComponentStory<typeof TabbedPanelBody>

const Template: component = (args) => <TabbedPanelBody {...args} />

export const Default: component = Template.bind({})
Default.args = {}

export const NoActiveContents = Template.bind({})
NoActiveContents.args = {
  ...Default.args,
  options: {
    contents: [
      <div key={1}>Content 1{WindowBodyStories.Default.args.children}</div>,
      <div key={2}>Content 2{WindowBodyStories.Default.args.children}</div>,
      <div key={3}>Content 3{WindowBodyStories.Default.args.children}</div>,
      <div key={4}>Content 4{WindowBodyStories.Default.args.children}</div>,
      <div key={5}>Content 5{WindowBodyStories.Default.args.children}</div>
    ]
  }
}

export const SomeActiveContents: component = Template.bind({})
SomeActiveContents.args = {
  ...Default.args,
  options: {
    ...NoActiveContents.args.options,
    activeContentsIndices: [0, 1]
  }
}

export const AllActiveContents: component = Template.bind({})
AllActiveContents.args = {
  ...Default.args,
  options: {
    ...NoActiveContents.args.options,
    activeContentsIndices: NoActiveContents.args.options.contents.map(
      (_, index) => index
    )
  }
}

export const Empty: component = Template.bind({})
Empty.args = {}
