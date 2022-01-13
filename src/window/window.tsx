import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { concatClassNames } from '@modular-ui-react/utils'
import { Component, ComponentPropTypes } from '../component/component'
import { WindowHeader } from '../window-header/window_header'
import { WindowBody } from '../window-body/window_body'
import './window.scss'

export interface WindowPropTypes extends ComponentPropTypes {
  options?: {
    header?: React.ReactNode
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
    onWindowClose?: Function
    onInit?: Function
  }
}

export const Window = ({
  children,
  className,
  options: {
    header,
    hasDragButton = false,
    hasMinimizeButton = false,
    hasCloseButton = true,
    dragIcon,
    minimizeIcon,
    maximizeIcon,
    closeIcon,
    ...options
  } = {},
  lifecycle: { onWindowClose, ...lifecycle } = {},
  ...props
}: WindowPropTypes): JSX.Element => {
  const [minimized, setMinimized] = useState(false)

  const onWindowMinimize = () => {
    setMinimized(true)
  }
  const onWindowMaximize = () => {
    setMinimized(false)
  }

  return (
    <Component
      className={concatClassNames('Window', className)}
      options={options}
      lifecycle={lifecycle}
      {...props}
    >
      <WindowHeader
        className='window-header'
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
          onWindowMinimize,
          onWindowMaximize,
          onWindowClose
        }}
      >
        {header}
      </WindowHeader>
      <WindowBody
        className='window-body'
        style={{ display: minimized ? 'none' : null }}
      >
        {children}
      </WindowBody>
    </Component>
  )
}

Window.propTypes = {
  ...Component.propTypes,
  options: PropTypes.shape({
    header: PropTypes.node,
    hasDragButton: PropTypes.bool,
    hasMinimizeButton: PropTypes.bool,
    hasCloseButton: PropTypes.bool,
    maximized: PropTypes.bool,
    dragIcon: PropTypes.element,
    minimizeIcon: PropTypes.element,
    maximizeIcon: PropTypes.element,
    closeIcon: PropTypes.element
  }),
  lifecycle: PropTypes.shape({
    onWindowClose: PropTypes.func
  })
}
