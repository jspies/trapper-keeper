## Trapper Keeper

An incredibly simple configuration lib for Node.js. I was dissatisified with the complexity of config options out there. So here's a simple binder to store things in.

### Install

Not on npm yet. Add this to your dependencies.

```
"trapper-keeper": "https://github.com/jspies/trapper-keeper.git"
```

### Usage

```
var TrapperKeeper = new (require('trapper-keeper'))();

TrapperKeeper.get('my-setting');

```
