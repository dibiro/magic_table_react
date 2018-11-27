## Installation

The package can be installed via NPM:

```
npm install data_table_react --save
```

The package can be installed via yarn:

```
yarn add data_table_react
```

## Usage

```js
import React from "react";
import { TableMagic } from 'data_table_react'

const Keys = [
    {
        name: "id",
        label: "ID"
    },
    {
        name: "name",
        label: "Name"
    }
]

const Records = [
    {
        id: 1,
        name: "Leo"
    },
    {
        id: 2,
        name: "Susan"
    },
]

class Example extends React.Component {

  render() {
    return (
      <TableMagic
        keys={Keys}
        records={Records}
        name='Friends'
      />
    );
  }
}
```