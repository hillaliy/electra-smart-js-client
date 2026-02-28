# Electra Smart JS Client

[![npm](https://img.shields.io/npm/v/@yosnightfly/electra-smart-js-client?style=plastic)](https://www.npmjs.com/package/@yosnightfly/electra-smart-js-client)

Lightweight JavaScript/TypeScript client for interacting with Electra Smart devices and the Electra backend. This project is a JS port inspired by `yonatanp/electrasmart` and provides a convenient programmatic API for authentication, listing devices, reading telemetry, and sending commands.

**Highlights**

- Minimal, promise-based API that works in Node.js and bundlers.
- TypeScript definitions included in `lib/` and `src/` for first-class DX.
- Exposes a `Client` class for common device operations.

## Install

Install from npm:

```bash
npm install @yosnightfly/electra-smart-js-client
```

Or use `npx` for a quick auth helper:

```bash
npx electra-smart-js-client
# prints: { "imei": "<imei>", "token": "<token>" }
```

## Quick Start (Node)

Programmatic usage with Node.js / TypeScript:

```ts
import { Client } from 'electra-smart-js-client';

async function main() {
  // Create a client with previously obtained credentials
  const client = new Client({ imei: '<imei>', token: '<token>' });

  // List devices
  const devices = await client.getDevices();
  console.log('devices', devices);

  // Read combined telemetry for a device
  const telemetry = await client.getTelemetry(devices[0].id);
  console.log('telemetry', telemetry);

  // Convenience helpers (examples)
  await client.setMode(devices[0].id, 'HEAT');
  await client.setTemperature(devices[0].id, 22);
}

main().catch(console.error);
```

## Examples (individual methods)

Below are short, copy-pasteable examples demonstrating the primary `Client` methods.

```ts
// 1) Instantiate
const client = new Client({ imei: '<imei>', token: '<token>' });

// 2) List devices
const devices = await client.getDevices();

// 3) Get full telemetry (OPER, DIAG_L2, HB)
const telemetry = await client.getTelemetry(devices[0].id);
console.log(telemetry.OPER, telemetry.DIAG_L2, telemetry.HB);

// 4) Get only operational telemetry (OPER)
const oper = await client.getOperationalTelemetry(devices[0].id);
console.log('OPER', oper);

// 5) Send a low-level command (override operational fields)
await client.sendCommand(devices[0].id, { SPT: '22', AC_MODE: 'HEAT' });

// 6) High-level helpers
await client.setTemperature(devices[0].id, 24); // sets SPT
await client.setMode(devices[0].id, 'COOL');
await client.setTimer(devices[0].id, true);
await client.setShabbatMode(devices[0].id, false);
await client.setFanSpeed(devices[0].id, '3');
await client.setIFeel(devices[0].id, true);
await client.setSleep(devices[0].id, false);
```

Replace the example method names above with the exact APIs available on `Client` in your installed version — autocomplete and type hints are available when using TypeScript.

## API (overview)

- `new Client({ imei, token })` — instantiate with credentials.
- `client.getDevices()` — returns a list of known devices.
- `client.getDeviceTelemetry(deviceId)` — fetch latest telemetry for a device.
- `client.sendCommand(deviceId, payload)` — send a command to a device.
- Additional server helpers are available under `lib/electra/server-types` for lower-level interactions (OTP, token validation, etc.).

See the `lib/` directory for built JS and the `src/` directory for TypeScript source and types.

## Development

Clone and install dependencies:

```bash
git clone https://github.com/rluvaton/electra-smart-js-client.git
cd electra-smart-js-client
npm install
```

Build and run examples:

```bash
npm run build
node ./lib/index.js
```

Run TypeScript checks:

```bash
npm run build:types
npm run lint
```

## Contributing

Contributions, bug reports and pull requests are welcome. When opening issues or PRs, please include:

- Node/npm versions you tested with
- Repro steps and minimal code sample

## License

This project is provided under the terms in `LICENSE.md`.

## Contact

For questions or support, open an issue on the repository.
