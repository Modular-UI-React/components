import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ContextMenu, MenuItem } from '@modular-ui-react/components'

const story: ComponentMeta<typeof ContextMenu> = {
  title: 'ContextMenu',
  component: ContextMenu
}
export default story

type component = ComponentStory<typeof ContextMenu>

const Template: component = (args) => <ContextMenu {...args} />

export const Default: component = Template.bind({})
Default.args = {
  children: [
    <MenuItem key='1'>
      <>Menu 1</>
      <MenuItem>1 - 1</MenuItem>
      <MenuItem>1 - 2</MenuItem>
    </MenuItem>,
    <MenuItem key='2'>
      <>Menu 2</>
      <MenuItem>2 - 1</MenuItem>
      <MenuItem>2 - 2</MenuItem>
      <MenuItem>
        <>2 - 3</>
        <MenuItem>2 - 3 - 1</MenuItem>
        <MenuItem>2 - 3 - 2</MenuItem>
      </MenuItem>
      <MenuItem>
        <>2 - 4</>
        <MenuItem>2 - 4 - 1</MenuItem>
        <MenuItem>2 - 4 - 2</MenuItem>
      </MenuItem>
    </MenuItem>,
    <MenuItem key='3'>Menu 3</MenuItem>,
    <MenuItem key='4'>Menu 4</MenuItem>
  ],
  style: {
    backgroundColor: 'skyblue',
    width: 'max-content'
  }
}
