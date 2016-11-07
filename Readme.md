## Trapper Keeper

An incredibly simple configuration lib for Node.js. I was dissatisified with the complexity of config options out there. So here's a simple binder to store things in.

### Install

```
npm install trapper-keeper --save
```

### Setup

Trapper Keeper assumes a config folder that contains json files for your environments. By default it assumes a default folder of config/ and a default environment of 'development'.

These can be changed with the environment variables:

```
CONFIG_DIR="config/"
ENV="development"
```

Trapper Keeper will read the file "config/development.json" and provide the settings for that environment.

### Features

Trapper Keeper supports nested settings using dot notation.

If your file looks like this:

```
{
  amazon: {
    secret: "boooo"
  }
}
```

You can access your setting like this:

```
TrapperKeeper.get('aws.secret');
```

TrapperKeeper will also override root level settings with an environment variable of the same name.

If your file looks like this:

```
{
  PORT: 8000
}
```

But you have an environment variable PORT=9000, then TrapperKeeper will return 9000.

### Usage

```
var TrapperKeeper = new (require('trapper-keeper'))();

TrapperKeeper.get('my-setting');

```
