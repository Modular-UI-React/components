import React from "react";
import PropTypes from "prop-types";
import { parseArray, concatClassNames } from "../../lib/utils";
import { Component } from "../component/component";
import { WindowControlBar } from "../window-control-bar/window_control_bar";
import "./window_header.scss";

export function WindowHeader({
  children,
  className,
  options: {
    hasDragButton = false,
    hasMinimizeButton = false,
    hasCloseButton = true,
    dragIcon,
    minimizeIcon,
    maximizeIcon,
    closeIcon,
    ...options
  } = {},
  lifecycle: {
    onWindowDragStart,
    onWindowDragEnd,
    onWindowMinimize,
    onWindowMaximize,
    onWindowClose,
    ...lifecycle
  } = {},
  ...props
}) {
  return (
    <Component
      className={concatClassNames("WindowHeader", className)}
      options={options}
      lifecycle={lifecycle}
      {...props}
    >
      <div className="header-title-bar">{children}</div>
      <WindowControlBar
        className="header-control-bar"
        options={{
          hasDragButton,
          hasMinimizeButton,
          hasCloseButton,
          dragIcon,
          minimizeIcon,
          maximizeIcon,
          closeIcon,
        }}
        lifecycle={{
          onWindowDragStart,
          onWindowDragEnd,
          onWindowMinimize,
          onWindowMaximize,
          onWindowClose,
        }}
      />
    </Component>
  );
}

WindowHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  className: PropTypes.string,
  options: PropTypes.shape({
    hasDragButton: PropTypes.bool,
    hasMinimizeButton: PropTypes.bool,
    hasCloseButton: PropTypes.bool,
    dragIcon: PropTypes.element,
    minimizeIcon: PropTypes.element,
    maximizeIcon: PropTypes.element,
    closeIcon: PropTypes.element,
  }),
  lifecycle: PropTypes.shape({
    onWindowDragStart: PropTypes.func,
    onWindowDragEnd: PropTypes.func,
    onWindowMinimize: PropTypes.func,
    onWindowMaximize: PropTypes.func,
    onWindowClose: PropTypes.func,
  }),
};
