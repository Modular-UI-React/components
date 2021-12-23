import React, { useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import Tippy from '@tippyjs/react'
import { parseArray, concatClassNames } from '@modular-ui-react/utils'
import { MdArrowForwardIos } from 'react-icons/md'
import { useLifecycle } from '@modular-ui-react/hooks'
import { Component, ComponentPropTypes } from '../component/component'
import './context_menu.scss'

export interface MenuItemProps extends ComponentPropTypes {}

export const MenuItem = ({
  children,
  className,
  // lifecycle: { onInit, ...lifecycle } = {},
  ...props
}: MenuItemProps): JSX.Element => {
  const ref = useRef()

  children = parseArray(children)

  props.lifecycle = useLifecycle(props.lifecycle)
  props.lifecycle.onInit = (element) => {
    ref.current = element
    // console.log("<ContextMenu>: onInit(): ", element);
  }
  // const onElementInit = useCallback((element) => {
  //   console.log("<ContextMenu>: onInit(): ", element);
  //   ref.current = element;
  //   return [null, onInit];
  // }, []);

  if (children.length > 1) {
    const menus = <ContextMenu className=''>{children.slice(1)}</ContextMenu>

    return (
      <>
        <Component
          className={concatClassNames('MenuItem', className)}
          // lifecycle={{ onInit: onElementInit, ...lifecycle }}
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
      </>
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

export function ContextMenu({ children, className, ...props }) {
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
