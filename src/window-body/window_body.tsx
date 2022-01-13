import React from 'react'
import { concatClassNames } from '@modular-ui-react/utils'
import { Component, ComponentPropTypes } from '../component/component'
import './window_body.scss'

export interface WindowBodyPropTypes extends ComponentPropTypes {}

export const WindowBody = ({
  children,
  className,
  ...props
}: WindowBodyPropTypes): JSX.Element => {
  return (
    <Component className={concatClassNames('WindowBody', className)} {...props}>
      {children}
    </Component>
  )
}

WindowBody.propTypes = {
  ...Component.propTypes
}
