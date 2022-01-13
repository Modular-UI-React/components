import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TabbedWindow } from '@modular-ui-react/components'
import * as TabbedPanelStories from './tabbed_panel.stories'

const story: ComponentMeta<typeof TabbedWindow> = {
  component: TabbedWindow,
  title: 'TabbedWindow'
}
export default story

type component = ComponentStory<typeof TabbedWindow>

const Template: component = (args) => <TabbedWindow {...args} />

export const Default: component = Template.bind({})
Default.args = {}

export const NoActiveSingleViewTabs: component = Template.bind({})
NoActiveSingleViewTabs.args = {
  ...Default.args,
  options: {
    ...TabbedPanelStories.NoActiveSingleViewTabs.args.options,
    header: <span>Header</span>
  }
}

export const MultiActiveMultiViewStaticTabs: component = Template.bind({})
MultiActiveMultiViewStaticTabs.args = {
  ...Default.args,
  options: {
    ...TabbedPanelStories.MultiActiveMultiViewStaticTabs.args.options,
    header: NoActiveSingleViewTabs.args.options.header
  }
}

export const MultiActiveMultiViewDynamicTabs: component = Template.bind({})
MultiActiveMultiViewDynamicTabs.args = {
  ...Default.args,
  options: {
    ...TabbedPanelStories.MultiActiveMultiViewDynamicTabs.args.options,
    header: NoActiveSingleViewTabs.args.options.header
  }
}

export const Empty: component = Template.bind({})
Empty.args = {}
