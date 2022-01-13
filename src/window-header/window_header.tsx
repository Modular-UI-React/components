import React from 'react'
import PropTypes from 'prop-types'
import { concatClassNames } from '@modular-ui-react/utils'
import { Component } from '../component/component'
import {
  WindowControlBar,
  WindowControlBarPropTypes
} from '../window-control-bar/window_control_bar'
import './window_header.scss'

export interface WindowHeaderPropTypes extends WindowControlBarPropTypes {
  options?: {
    hasDragButton?: boolean
    hasMinimizeButton?: boolean
    hasCloseButton?: boolean
    dragIcon?: JSX.Element
    minimizeIcon?: JSX.Element
    maximizeIcon?: JSX.Element
    closeIcon?: JSX.Element
  }
  lifecycle?: {
    onWindowDragStart?: Function
    onWindowDragEnd?: Function
    onWindowMinimize?: Function
    onWindowMaximize?: Function
    onWindowClose?: Function
  }
}

export const WindowHeader = ({
  children,
  className,
  options: {
    hasDragButton = false,
    hasMinimizeButton = false,
    hasCloseButton = true,
    dragIcon,
    minimizeIcon,
    maximizeIcon,
    closeIcon,
    ...options
  } = {},
  lifecycle: {
    onWindowDragStart,
    onWindowDragEnd,
    onWindowMinimize,
    onWindowMaximize,
    onWindowClose,
    ...lifecycle
  } = {},
  ...props
}: WindowHeaderPropTypes): JSX.Element => {
  return (
    <Component
      className={concatClassNames('WindowHeader', className)}
      options={options}
      lifecycle={lifecycle}
      {...props}
    >
      <div className='header-title-bar'>{children}</div>
      <WindowControlBar
        className='header-control-bar'
        options={{
          hasDragButton,
          hasMinimizeButton,
          hasCloseButton,
          dragIcon,
          minimizeIcon,
          maximizeIcon,
          closeIcon
        }}
        lifecycle={{
          onWindowDragStart,
          onWindowDragEnd,
          onWindowMinimize,
          onWindowMaximize,
          onWindowClose
        }}
      />
    </Component>
  )
}

WindowHeader.propTypes = {
  ...WindowControlBar.propTypes,
  options: PropTypes.shape({
    hasDragButton: PropTypes.bool,
    hasMinimizeButton: PropTypes.bool,
    hasCloseButton: PropTypes.bool,
    dragIcon: PropTypes.element,
    minimizeIcon: PropTypes.element,
    maximizeIcon: PropTypes.element,
    closeIcon: PropTypes.element
  }),
  lifecycle: PropTypes.shape({
    onWindowDragStart: PropTypes.func,
    onWindowDragEnd: PropTypes.func,
    onWindowMinimize: PropTypes.func,
    onWindowMaximize: PropTypes.func,
    onWindowClose: PropTypes.func
  })
}
