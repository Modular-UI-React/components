import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TabbedPanelHeader } from '@modular-ui-react/components'

const story: ComponentMeta<typeof TabbedPanelHeader> = {
  component: TabbedPanelHeader,
  title: 'TabbedPanelHeader'
}
export default story

type component = ComponentStory<typeof TabbedPanelHeader>

const Template: component = (args) => <TabbedPanelHeader {...args} />

export const Default: component = Template.bind({})
Default.args = {}

export const NoActiveLinks: component = Template.bind({})
NoActiveLinks.args = {
  ...Default.args,
  options: {
    links: [
      <div key={1}>Link 1</div>,
      <div key={2}>Link 2</div>,
      <div key={3}>Link 3</div>,
      <div key={4}>Link 4</div>,
      <div key={5}>Link 5</div>
    ]
  }
}

export const SomeActiveLinks: component = Template.bind({})
SomeActiveLinks.args = {
  ...Default.args,
  options: {
    ...NoActiveLinks.args.options,
    activeLinksIndices: [1, 3]
  }
}

export const AllActiveLinks: component = Template.bind({})
AllActiveLinks.args = {
  ...Default.args,
  options: {
    ...NoActiveLinks.args.options,
    activeLinksIndices: NoActiveLinks.args.options.links.map(
      (_, index) => index
    )
  }
}

export const Empty: component = Template.bind({})
Empty.args = {}
