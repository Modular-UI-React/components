import React from 'react'
import PropTypes from 'prop-types'
import { parseArray, concatClassNames } from '@modular-ui-react/utils'
import { Component, ComponentPropTypes } from '../component/component'
import './tabbed_panel_header.scss'

export interface TabbedPanelHeaderPropTypes extends ComponentPropTypes {
  options?: {
    links?: JSX.Element[]
    activeLinksIndices?: number[]
    contextMenu?: JSX.Element
    contextMenuShow?: boolean
  }
  lifecycle?: {
    onLinkClick?: Function
    onLinkDoubleClick?: Function
    onInit?: Function
  }
}

export const TabbedPanelHeader = ({
  children,
  className,
  options: { links, activeLinksIndices, ...options } = {},
  lifecycle: { onLinkClick, onLinkDoubleClick, ...lifecycle } = {},
  ...props
}: TabbedPanelHeaderPropTypes): JSX.Element => {
  return (
    <Component
      className={concatClassNames('TabbedPanelHeader', className)}
      options={options}
      lifecycle={lifecycle}
      {...props}
    >
      <Component key='links' className='links'>
        {parseArray(links).map((link, index) => {
          const props: {
            className: string
            onClick: Function
            onDoubleClick: Function
            active: string
          } = {
            className: concatClassNames('link', link.className),
            onClick: () => onLinkClick?.(index),
            onDoubleClick: () => onLinkDoubleClick?.(index),
            active: undefined
          }

          if (activeLinksIndices && activeLinksIndices.indexOf(index) > -1) {
            props.active = 'active'
          }

          return React.cloneElement(link, props)
        })}
      </Component>
      {children}
    </Component>
  )
}

TabbedPanelHeader.propTypes = {
  ...Component.propTypes,
  options: PropTypes.shape({
    links: PropTypes.arrayOf(PropTypes.element),
    activeLinksIndices: PropTypes.arrayOf(PropTypes.number)
  }),
  lifecycle: PropTypes.shape({
    onLinkClick: PropTypes.func,
    onLinkDoubleClick: PropTypes.func
  })
}
