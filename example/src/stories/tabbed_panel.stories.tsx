import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TabbedPanel } from '@modular-ui-react/components'
import * as TabbedPanelHeaderStories from './tabbed_panel_header.stories'
import * as TabbedPanelBodyStories from './tabbed_panel_body.stories'

const story: ComponentMeta<typeof TabbedPanel> = {
  component: TabbedPanel,
  title: 'TabbedPanel'
}
export default story

type component = ComponentStory<typeof TabbedPanel>

const Template: component = (args) => <TabbedPanel {...args} />

export const Default: component = Template.bind({})
Default.args = {}

export const NoActiveSingleViewTabs: component = Template.bind({})
NoActiveSingleViewTabs.args = {
  ...Default.args,
  options: {
    tabs: TabbedPanelHeaderStories.NoActiveLinks.args.options.links.map(
      (link, index) => ({
        link,
        content:
          TabbedPanelBodyStories.NoActiveContents.args.options.contents[index]
      })
    )
  }
}

export const MultiActiveMultiViewStaticTabs: component = Template.bind({})
MultiActiveMultiViewStaticTabs.args = {
  ...Default.args,
  options: {
    ...NoActiveSingleViewTabs.args.options,
    activeTabsIndices: [1, 2],
    maxActiveTabs: 3
  }
}

export const MultiActiveMultiViewDynamicTabs: component = Template.bind({})
MultiActiveMultiViewDynamicTabs.args = {
  ...Default.args,
  options: {
    ...MultiActiveMultiViewStaticTabs.args.options,
    hasNewTabButton: true
  }
}

export const Empty: component = Template.bind({})
Empty.args = {}
