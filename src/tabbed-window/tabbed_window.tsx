import React from 'react'
import PropTypes from 'prop-types'
import { concatClassNames } from '@modular-ui-react/utils'
import { Window, WindowPropTypes } from '../window/window'
import { TabbedPanel } from '../tabbed-panel/tabbed_panel'
import './tabbed_window.scss'

export interface TabbedWindowPropTypes extends WindowPropTypes {
  options?: {
    header?: React.ReactNode
    tabs?: Array<{ link: React.ReactNode; content: React.ReactNode }>
    activeTabsIndices?: number[]
    hasNewTabButton?: boolean
    newTabButton?: JSX.Element
    maxTabs?: number
    maxActiveTabs?: number
  }
  lifecycle?: {
    onNewTabButtonClick?: React.MouseEventHandler<HTMLButtonElement>
    onInit?: Function
  }
}

export const TabbedWindow = ({
  children,
  className,
  options: {
    header,
    tabs,
    activeTabsIndices,
    hasNewTabButton,
    newTabButton,
    maxTabs,
    maxActiveTabs = 1,
    ...options
  } = {},
  lifecycle: { onNewTabButtonClick, ...lifecycle } = {},
  ...props
}: TabbedWindowPropTypes): JSX.Element => {
  return (
    <Window
      className={concatClassNames('TabbedWindow', className)}
      options={{ header, ...options }}
      lifecycle={lifecycle}
      {...props}
    >
      <TabbedPanel
        className='tabbed-panel'
        options={{
          tabs,
          activeTabsIndices,
          hasNewTabButton,
          newTabButton,
          maxTabs,
          maxActiveTabs
        }}
        lifecycle={{ onNewTabButtonClick }}
      >
        {children}
      </TabbedPanel>
    </Window>
  )
}

TabbedWindow.propTypes = {
  ...Window.propTypes,
  options: PropTypes.shape({
    header: PropTypes.node,
    tabs: PropTypes.arrayOf(
      PropTypes.shape({ link: PropTypes.node, content: PropTypes.node })
    ),
    activeTabsIndices: PropTypes.arrayOf(PropTypes.number),
    hasNewTabButton: PropTypes.bool,
    newTabButton: PropTypes.element,
    maxTabs: PropTypes.number,
    maxActiveTabs: PropTypes.number
  }),
  lifecycle: PropTypes.shape({
    onNewTabButtonClick: PropTypes.func
  })
}
