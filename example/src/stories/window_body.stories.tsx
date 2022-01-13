import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { WindowBody } from '@modular-ui-react/components'

const story: ComponentMeta<typeof WindowBody> = {
  component: WindowBody,
  title: 'WindowBody'
}
export default story

type component = ComponentStory<typeof WindowBody>

const Template: component = (args) => <WindowBody {...args} />

export const Default: component = Template.bind({})
Default.args = {
  children: [
    <div key='1'>
      <h2>Window Body</h2>
      <p>The quick brown fox jumped over the lazy dog.</p>
    </div>
  ]
}

export const Empty: component = Template.bind({})
Empty.args = {}
