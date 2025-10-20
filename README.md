# react-native-rn-sms-fetch

a sms fetch for android new arch

## Installation

```sh
npm install rn-sms-fetch
```

## Usage

```js
import { readSms, type Sms } from 'react-native-rn-sms-fetch';


const result = await readSms();
```

The res is a array of objects where each object is the message with their id, address, body and date.

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
