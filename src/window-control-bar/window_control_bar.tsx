import React from 'react'
import PropTypes from 'prop-types'
import {
  FaWindowMinimize,
  FaWindowMaximize,
  FaWindowClose
} from 'react-icons/fa'
import { RiDragMoveFill } from 'react-icons/ri'
import { concatClassNames } from '@modular-ui-react/utils'
import { Component, ComponentPropTypes } from '../component/component'
import { ToggleButton } from '../toggle-button/toggle_button'
import './window_control_bar.scss'

export interface WindowControlBarPropTypes extends ComponentPropTypes {
  options?: {
    hasDragButton?: boolean
    hasMinimizeButton?: boolean
    hasCloseButton?: boolean
    dragIcon?: JSX.Element
    minimizeIcon?: JSX.Element
    maximizeIcon?: JSX.Element
    closeIcon?: JSX.Element
    contextMenu?: JSX.Element
    contextMenuShow?: boolean
  }
  lifecycle?: {
    onWindowDragStart?: Function
    onWindowDragEnd?: Function
    onWindowMinimize?: Function
    onWindowMaximize?: Function
    onWindowClose?: Function
    onInit?: Function
  }
}

export const WindowControlBar = ({
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
}: WindowControlBarPropTypes): JSX.Element => {
  return (
    <Component
      className={concatClassNames('WindowControlBar', className)}
      options={options}
      lifecycle={lifecycle}
      {...props}
    >
      {hasDragButton && (
        <ToggleButton
          className='drag-button'
          options={{
            states: [
              {
                view: dragIcon ?? <RiDragMoveFill />,
                onToggle: () => {
                  onWindowDragStart?.()
                  return onWindowDragEnd?.()
                }
              }
            ]
          }}
        />
      )}
      {hasMinimizeButton && (
        <ToggleButton
          className='minimize-button'
          options={{
            states: [
              {
                view: minimizeIcon ?? <FaWindowMinimize />,
                onState: onWindowMaximize
              },
              {
                view: maximizeIcon ?? <FaWindowMaximize />,
                onState: onWindowMinimize
              }
            ]
          }}
        />
      )}
      {hasCloseButton && (
        <ToggleButton
          className='close-button'
          options={{
            states: [
              {
                view: closeIcon ?? <FaWindowClose />,
                onState: () => onWindowClose
              }
            ]
          }}
        />
      )}
    </Component>
  )
}

WindowControlBar.propTypes = {
  ...Component.propTypes,
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
