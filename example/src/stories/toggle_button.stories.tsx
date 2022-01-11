import React from 'react'
import { FaDoorOpen, FaDoorClosed } from 'react-icons/fa'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ToggleButton } from '@modular-ui-react/components'

const story: ComponentMeta<typeof ToggleButton> = {
  title: 'ToggleButton',
  component: ToggleButton
}
export default story

type component = ComponentStory<typeof ToggleButton>

const Template: component = (args) => <ToggleButton {...args} />

export const Default: component = Template.bind({})
Default.args = {}

export const FourStates: component = Template.bind({})
FourStates.args = {
  ...Default.args,
  options: {
    states: [
      {
        view: <button>1</button>,
        onToggle: () => {
          console.log('State 1: Toggle Start')
          return () => console.log('State 1: Toggle End')
        },
        onState: () => {
          console.log('State 1: Start')
          return () => console.log('State 1: End')
        }
      },
      {
        view: <button>2</button>,
        onToggle: () => {
          console.log('State 2: Toggle Start')
          return () => console.log('State 2: Toggle End')
        },
        onState: () => {
          console.log('State 2: Start')
          return () => console.log('State 2: End')
        }
      },
      {
        view: <button>3</button>,
        onToggle: () => {
          console.log('State 3: Toggle Start')
          return () => console.log('State 3: Toggle End')
        },
        onState: () => {
          console.log('State 3: Start')
          return () => console.log('State 3: End')
        }
      },
      {
        view: <button>4</button>,
        onToggle: () => {
          console.log('State 4: Toggle Start')
          return () => console.log('State 4: Toggle End')
        },
        onState: () => {
          console.log('State 4: Start')
          return () => console.log('State 4: End')
        }
      }
    ],
    initialStateIndex: 2
  }
}

export const Door: component = Template.bind({})
Door.args = {
  ...Default.args,
  options: {
    states: [
      {
        view: <FaDoorOpen />,
        onState: () => console.log('Door Opened')
      },
      {
        view: <FaDoorClosed />,
        onState: () => console.log('Door Closed')
      }
    ]
  }
}

export const Empty: component = Template.bind({})
Empty.args = {}
