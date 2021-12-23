# Modular-UI-React Components

> Base component that implements basic lifecycles and properties

[![NPM](https://img.shields.io/npm/v/component.svg)](https://www.npmjs.com/package/component) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @modular-ui-react/components
```

or

```bash
yarn add @modular-ui-react/components
```

## Usage

```tsx
import React from 'react'
import { Component } from '@modular-ui-react/component'

function MyComponent({ children, className, ...props }) {
  return (
    <Component className={[className, 'MyComponent'].join(' ')} {...props}>
      {children}
    </Component>
  )
}
```

## Contributing

Pull Requests are Welcome.

## License

This repository is released under [MIT License](LICENSE).
