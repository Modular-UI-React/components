import React, { MutableRefObject, ReactNode, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useData, useLifecycle } from '@modular-ui-react/hooks'
import { parseArray, concatClassNames } from '@modular-ui-react/utils'
import { Pointer } from '@pointerjs/pointer'
import { Component, ComponentPropTypes } from '../component/component'
import './toggle_button.scss'

export interface ToggleButtonPropTypes extends ComponentPropTypes {
  options?: {
    states?: Array<{
      view?: ReactNode
      onToggle?: Function
      onState?: Function
    }>
    initialStateIndex?: number
    contextMenu?: JSX.Element
    contextMenuShow?: boolean
  }
}

export const ToggleButton = ({
  className,
  options: { states, initialStateIndex = 0, ...options } = {},
  ...props
}: ToggleButtonPropTypes): JSX.Element => {
  const ref: MutableRefObject<HTMLElement> = useRef()

  const [stateIndex, setStateIndex, stateIndexRef] = useData(null)
  const onPrevStateEnd: MutableRefObject<Function> = useRef()

  props.lifecycle = useLifecycle(props.lifecycle)

  states = parseArray(states)

  useEffect(() => {
    setStateIndex(Math.min(initialStateIndex, states.length - 1))
  }, [initialStateIndex])

  useEffect(() => {
    if (stateIndex != null) {
      if (states.length > 0) {
        onPrevStateEnd.current?.()
        onPrevStateEnd.current = states[stateIndex]?.onState?.()
      }
    }
  }, [stateIndex])

  const onClick = () => {
    setStateIndex(stateIndex < states.length - 1 ? stateIndex + 1 : 0)
  }

  props.lifecycle.onInit = (element: HTMLElement) => {
    ref.current = element

    const pointer = new Pointer(element)
    pointer.addPrimaryStateListener(() => {
      return states[stateIndexRef.current]?.onToggle?.()
    })
  }

  return (
    <Component
      className={concatClassNames('ToggleButton', className)}
      options={options}
      onClick={onClick}
      {...props}
    >
      {states[stateIndex]?.view}
    </Component>
  )
}

ToggleButton.propTypes = {
  ...Component.propTypes,
  options: PropTypes.shape({
    // ...Component.propTypes.options,
    states: PropTypes.arrayOf(
      PropTypes.shape({
        view: PropTypes.node,
        onToggle: PropTypes.func,
        onState: PropTypes.func
      })
    ),
    initialStateIndex: PropTypes.number
  })
}
