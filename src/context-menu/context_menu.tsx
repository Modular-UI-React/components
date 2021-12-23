import React, { useRef, MutableRefObject } from 'react'
import PropTypes from 'prop-types'
import Tippy from '@tippyjs/react'
import { parseArray, concatClassNames } from '@modular-ui-react/utils'
import { MdArrowForwardIos } from 'react-icons/md'
import { useLifecycle } from '@modular-ui-react/hooks'
import { Component, ComponentPropTypes } from '../component/component'
import './context_menu.scss'

export interface MenuItemPropTypes extends ComponentPropTypes {}

export const MenuItem = ({
  children,
  className,
  ...props
}: MenuItemPropTypes): JSX.Element => {
  const ref: MutableRefObject<HTMLElement> = useRef()

  children = parseArray(children)

  props.lifecycle = useLifecycle(props.lifecycle)
  props.lifecycle.onInit = ref

  if (children.length > 1) {
    const menus = <ContextMenu className=''>{children.slice(1)}</ContextMenu>

    return (
      <React.Fragment>
        <Component
          className={concatClassNames('MenuItem', className)}
          {...props}
        >
          {children[0]}
          <MdArrowForwardIos className='menu-arrow' />
        </Component>
        <Tippy
          reference={ref}
          interactive
          placement='right-end'
          delay={0}
          duration={0}
          offset={[0, 0]}
          content={menus}
        />
      </React.Fragment>
    )
  }
  return (
    <Component className={concatClassNames('MenuItem', className)} {...props}>
      {children}
    </Component>
  )
}

MenuItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  className: PropTypes.string
}

export interface ContextMenuPropTypes extends ComponentPropTypes {}

export const ContextMenu = ({
  children,
  className,
  ...props
}: ContextMenuPropTypes): JSX.Element => {
  return (
    <Component
      className={concatClassNames('ContextMenu', className)}
      {...props}
    >
      {parseArray(children)}
    </Component>
  )
}

ContextMenu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  className: PropTypes.string
}
