import React, {
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useState,
  MutableRefObject,
  MouseEventHandler
} from 'react'
import PropTypes from 'prop-types'
import { useStyle } from '@modular-ui-react/hooks'
import { parseArray, concatClassNames } from '@modular-ui-react/utils'
import './component.scss'

const execCallback = (
  func: Function | MutableRefObject<any>,
  ...args: any[]
) => {
  if (func == null) return undefined

  if (typeof func === 'object') {
    func.current = args[0]
    return undefined
  }

  const callbackResult = [func?.(...args)].flat(Infinity)
  const result = callbackResult.splice(0, 1)
  for (const resultItem of callbackResult) {
    result.push(execCallback(resultItem, ...args))
  }
  const cleanupCallbackChain = result.flat(Infinity)
  return () => {
    while (cleanupCallbackChain.length > 0) {
      cleanupCallbackChain.pop()?.(...args)
    }
  }
}

export interface ComponentPropTypes {
  children?: string | JSX.Element | JSX.Element[]
  className?: string
  style?: object
  options?: { contextMenu?: JSX.Element; contextMenuShow?: boolean }
  lifecycle?: {
    onInit?: Function | MutableRefObject<any>
    onMount?: Function | MutableRefObject<any>
    onRender?: Function | MutableRefObject<any>
    onStyleChange?: Function | MutableRefObject<any>
  }
}

export const Component = ({
  children,
  className,
  style,
  options: { contextMenu, contextMenuShow } = {},
  lifecycle: { onInit, onMount, onRender, onStyleChange } = {},
  ...props
}: ComponentPropTypes): JSX.Element => {
  const ref: MutableRefObject<HTMLElement> = useRef()
  const onCleanupRef: MutableRefObject<any> = useRef()

  // onMount/onUnmount
  useEffect(() => execCallback(onMount, ref.current), [onMount])

  // onDestruct
  useEffect(() => onCleanupRef.current, [])

  // onRender
  const onRenderResult =
    ref.current != null ? execCallback(onRender, ref.current) : null
  useEffect(() => {
    onRenderResult?.()
  })

  // Handle inline styles
  const [inlineStyle] = useStyle(style, (...args: any[]) => {
    execCallback(onStyleChange, ...args)
  })

  // onInit
  const onInitialize = useCallback((element) => {
    if (element != null) {
      onCleanupRef.current = execCallback(onInit, element, [
        ...element.children
      ])
    }
    ref.current = element
  }, [])

  const classMemo = useMemo(
    () => concatClassNames('Component', className),
    [className]
  )

  // Manage context menu
  const contextMenuRef: MutableRefObject<HTMLElement> = useRef()
  const anchorXY: MutableRefObject<number[]> = useRef([0, 0])
  const [contextMenuVisibility, setContextMenuVisibility] =
    useState(contextMenuShow)

  const onPointerDown = useCallback((event) => {
    const elem = event.target
    if (elem !== contextMenuRef.current) {
      const childNodes = Array.from(contextMenuRef.current.childNodes)
      for (const child of childNodes) {
        if (elem === child) {
          return
        }
      }
      setContextMenuVisibility(false)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [])

  const setContextMenuFlag = (flag: boolean) => {
    if (flag) {
      document.addEventListener('pointerdown', onPointerDown)
      setContextMenuVisibility(true)
    } else {
      setContextMenuVisibility(false)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }

  useEffect(() => {
    setContextMenuFlag(contextMenuShow)
    return () => setContextMenuFlag(false)
  }, [contextMenuShow])

  const onContextMenuShow: MouseEventHandler<HTMLDivElement> = (e) => {
    if (contextMenu == null) return

    e.preventDefault()
    anchorXY.current[0] = e.pageX
    anchorXY.current[1] = e.pageY
    setContextMenuFlag(true)
  }

  return (
    <div
      ref={onInitialize}
      className={classMemo}
      style={inlineStyle ?? {}}
      onContextMenu={onContextMenuShow}
      {...props}
    >
      {parseArray(children)}
      {contextMenu &&
        contextMenuVisibility &&
        React.cloneElement(contextMenu, {
          style: {
            position: 'absolute',
            left: anchorXY.current[0],
            top: anchorXY.current[1]
          },
          lifecycle: {
            ...contextMenu.props.lifecycle,
            onInit: (element: HTMLElement) => {
              contextMenuRef.current = element
              return [null, contextMenu.props.lifecycle?.onInit]
            }
          }
        })}
    </div>
  )
}

Component.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  className: PropTypes.string,
  style: PropTypes.object,
  options: PropTypes.shape({
    contextMenu: PropTypes.element,
    contextMenuShow: PropTypes.bool
  }),
  lifecycle: PropTypes.shape({
    onInit: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    onMount: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    onRender: PropTypes.func,
    onStyleChange: PropTypes.func
  })
}
