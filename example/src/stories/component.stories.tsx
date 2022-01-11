import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Component } from '@modular-ui-react/components'

const story: ComponentMeta<typeof Component> = {
  title: 'Component',
  component: Component
}
export default story

type component = ComponentStory<typeof Component>

const Template: component = (args) => <Component {...args} />

export const Default: component = Template.bind({})
Default.args = {
  children: [<div key={1}>Child 1</div>, <div key={2}>Child 2</div>]
}

export const SimpleComponent: component = Template.bind({})
SimpleComponent.args = {
  ...Default.args,
  style: {
    border: '1px solid blue',
    backgroundColor: 'maroon',
    height: '64px'
  },
  lifecycle: {
    onInit: (element: HTMLElement, children: JSX.Element | JSX.Element[]) => {
      console.log('onInit(): ', element, children)
      return [
        () => console.log('onDestruct(): ', element),
        () => {
          console.log('onInitCallback1(): ', element, children)
          return [
            () => console.log('onDestructCallback1(): ', element),
            () => {
              console.log('onInitCallback1NestedCallback1(): ')
              return () => {
                console.log('onDestructCallback1NestedCallback1(): ')
              }
            },
            () => {
              console.log('onInitCallback1NestedCallback2(): ')
              return () => {
                console.log('onDestructCallback1NestedCallback2(): ')
              }
            }
          ]
        },
        () => {
          console.log('onInitCallback2(): ', element, children)
          return [
            () => console.log('onDestructCallback2(): ', element),
            () => {
              console.log('onInitCallback2NestedCallback1(): ')
              return () => {
                console.log('onDestructCallback2NestedCallback1(): ')
              }
            },
            () => {
              console.log('onInitCallback2NestedCallback2(): ')
              return () => {
                console.log('onDestructCallback2NestedCallback2(): ')
              }
            }
          ]
        }
      ]
    },
    onMount: (element: HTMLElement) => {
      console.log('onMount(): ', element)
      return () => {
        console.log('onUnmount(): ', element)
      }
    },
    onRender: (element: HTMLElement) => {
      console.log('onRenderEvaluate(): ', element)
      return () => {
        console.log('onRenderDone(): ', element)
      }
    },
    onStyleChange: (current: object, updates: object, merged: object) => {
      console.log('onStyleChange(): ')
      console.log('current: ', current)
      console.log('updates: ', updates)
      console.log('merged: ', merged)
    }
  }
}

export const NestedComponent: component = Template.bind({})
NestedComponent.args = {
  ...SimpleComponent.args,
  children: [
    <Component lifecycle={{ onInit: () => console.log('1-1: onInit()') }}>
      <Component lifecycle={{ onInit: () => console.log('1-2: onInit()') }} />
    </Component>,
    <Component lifecycle={{ onInit: () => console.log('2-1: onInit()') }}>
      <Component lifecycle={{ onInit: () => console.log('2-2: onInit()') }} />
    </Component>
  ]
}

export const EmptyChildren: component = Template.bind({})
EmptyChildren.args = {
  ...SimpleComponent.args,
  children: []
}

export const Empty: component = Template.bind({})
Empty.args = {}
