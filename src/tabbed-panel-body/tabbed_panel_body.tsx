import React from 'react'
import PropTypes from 'prop-types'
import { parseArray, concatClassNames } from '@modular-ui-react/utils'
import { Component, ComponentPropTypes } from '../component/component'
import './tabbed_panel_body.scss'

export interface TabbedPanelBodyPropTypes extends ComponentPropTypes {
  options?: {
    contents?: JSX.Element[]
    activeContentsIndices?: number[]
    contextMenu?: JSX.Element
    contextMenuShow?: boolean
  }
}

export const TabbedPanelBody = ({
  children,
  className,
  options: { contents, activeContentsIndices, ...options } = {},
  ...props
}: TabbedPanelBodyPropTypes): JSX.Element => {
  return (
    <Component
      className={concatClassNames('TabbedPanelBody', className)}
      options={options}
      {...props}
    >
      <Component className='contents'>
        {parseArray(contents).map((content: JSX.Element, index: number) => {
          const props: { className: string; active: string } = {
            className: concatClassNames('content', content.props.className),
            active: undefined
          }

          if (
            activeContentsIndices &&
            activeContentsIndices.indexOf(index) !== -1
          ) {
            props.active = 'active'
          }

          return React.cloneElement(content, props)
        })}
      </Component>
      {children}
    </Component>
  )
}

TabbedPanelBody.propTypes = {
  ...Component.propTypes,
  options: PropTypes.shape({
    contents: PropTypes.arrayOf(PropTypes.element),
    activeContentsIndices: PropTypes.arrayOf(PropTypes.number)
  })
}
