# pino-yc-transport

A [Pino v7+ transport](https://getpino.io/#/docs/transports?id=v7-transports) to send message to [Yandex Cloud Logging](https://yandex.cloud/ru/services/logging) from serveless functions or containers.

## Installation

```
npm install pino-yc-transport
```

## Usage

```js
const pino = require("pino");

const config = {
  level: "debug",
  transport: {
    target: "pino-yc-transport",
  },
};

const logger = pino(config);

logger.debug("some message")
logger.debug({ foo: "bar" });
logger.debug("some message %o, %s", { foo: "bar" }, "baz");
logger.info("info");
logger.warn("warn");
logger.error("error");
logger.error(new Error("error"));
logger.fatal("fatal");
```
