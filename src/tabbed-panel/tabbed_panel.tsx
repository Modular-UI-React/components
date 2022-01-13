import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FaPlusSquare } from 'react-icons/fa'
import { concatClassNames } from '@modular-ui-react/utils'
import { Component, ComponentPropTypes } from '../component/component'
import { TabbedPanelHeader } from '../tabbed-panel-header/tabbed_panel_header'
import { TabbedPanelBody } from '../tabbed-panel-body/tabbed_panel_body'
import './tabbed_panel.scss'

const trimmedArray = (array: any[], maxLength: number) => {
  const excess = array.length - maxLength
  return excess > 0 ? array.slice(excess) : array
}

const normalizeArray = (array: any[]) => {
  array = array ?? []
  return Array.isArray(array) ? array : [array]
}

export interface TabbedPanelPropTypes extends ComponentPropTypes {
  options?: {
    tabs?: Array<{ link: React.ReactNode; content: React.ReactNode }>
    activeTabsIndices?: number[]
    hasNewTabButton?: boolean
    newTabButton?: JSX.Element
    maxTabs?: number
    maxActiveTabs?: number
    contextMenu?: JSX.Element
    contextMenuShow?: boolean
  }
  lifecycle?: {
    onNewTabButtonClick?: React.MouseEventHandler<HTMLButtonElement>
    onInit?: Function
  }
}

export const TabbedPanel = ({
  children,
  className,
  options: {
    tabs,
    activeTabsIndices,
    hasNewTabButton,
    newTabButton,
    maxTabs,
    maxActiveTabs = 1,
    ...options
  } = {},
  lifecycle: { onNewTabButtonClick, ...lifecycle } = {},
  ...props
}: TabbedPanelPropTypes): JSX.Element => {
  const [currentTabs, setCurrentTabs] = useState(normalizeArray(tabs))
  const [currentActiveIndices, setCurrentActiveIndices] = useState(
    normalizeArray(activeTabsIndices)
  )

  useEffect(() => {
    setCurrentTabs(normalizeArray(tabs))
  }, [tabs])

  useEffect(() => {
    setCurrentActiveIndices(normalizeArray(tabs))
  }, [activeTabsIndices])

  useEffect(() => {
    setCurrentTabs(trimmedArray(currentTabs, maxTabs))
  }, [maxTabs])

  useEffect(() => {
    setCurrentActiveIndices(trimmedArray(currentActiveIndices, maxActiveTabs))
  }, [maxActiveTabs])

  const links = currentTabs ? currentTabs.map((tab) => tab.link) : []
  const contents = currentTabs ? currentTabs.map((tab) => tab.content) : []

  const onLinkClick = (index: number) => {
    if (currentActiveIndices.indexOf(index) !== -1) return
    const updatedIndices = [...currentActiveIndices, index]
    setCurrentActiveIndices(trimmedArray(updatedIndices, maxActiveTabs))
  }

  const onLinkDoubleClick = (index: number) => {
    const indexIndex = currentActiveIndices.indexOf(index)
    if (indexIndex === -1) return
    const updatedIndices = [...currentActiveIndices]
    updatedIndices.splice(indexIndex, 1)
    setCurrentActiveIndices([...updatedIndices])
  }

  return (
    <Component
      className={concatClassNames('TabbedPanel', className)}
      options={options}
      lifecycle={lifecycle}
      {...props}
    >
      <TabbedPanelHeader
        options={{
          links,
          activeLinksIndices: currentActiveIndices
        }}
        lifecycle={{
          onLinkClick,
          onLinkDoubleClick
        }}
      >
        {hasNewTabButton &&
          (newTabButton ?? (
            <button
              key='new-tab-button'
              className='NewTabButton'
              onClick={onNewTabButtonClick}
            >
              <FaPlusSquare />
            </button>
          ))}
      </TabbedPanelHeader>
      <TabbedPanelBody
        options={{
          contents,
          activeContentsIndices: currentActiveIndices
        }}
      >
        {children}
      </TabbedPanelBody>
    </Component>
  )
}

TabbedPanel.propTypes = {
  ...Component.propTypes,
  options: PropTypes.shape({
    tabs: PropTypes.arrayOf(
      PropTypes.shape({ link: PropTypes.node, content: PropTypes.node })
    ),
    activeTabsIndices: PropTypes.arrayOf(PropTypes.number),
    hasNewTabButton: PropTypes.bool,
    newTabButton: PropTypes.element,
    maxTabs: PropTypes.number,
    maxActiveTabs: PropTypes.number
  }),
  lifecycle: PropTypes.shape({
    onNewTabButtonClick: PropTypes.func
  })
}
