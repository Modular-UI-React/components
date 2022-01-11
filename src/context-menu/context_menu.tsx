import React, { useRef, MutableRefObject } from 'react'
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

  const childrenArray = parseArray(children)

  props.lifecycle = useLifecycle(props.lifecycle)
  props.lifecycle.onInit = ref

  if (childrenArray.length > 1) {
    const menus = (
      <ContextMenu className=''>{childrenArray.slice(1)}</ContextMenu>
    )

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
  ...Component.propTypes
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
  ...Component.propTypes
}
