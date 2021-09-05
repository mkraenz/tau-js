# tau-js

```sh
                 _                    _
                | |_ __ _ _   _      (_)___
                | __/ _` | | | |_____| / __|
                | || (_| | |_| |_____| \__ \
                 \__\__,_|\__,_|    _/ |___/
                                   |__/
```

Client-side library for TAU - Twitch Api Unifier. Browser and NodeJS support. Full Typescript support.

## Install

Make sure you have a TAU backend running. Find it on [Github](https://github.com/Team-TAU/tau).

### Browser

Available as `window.TauClient`.

Download the library from [our Github Releases](https://github.com/proSingularity/tau-js/releases).

```html
<script src="/path/to/tau-js.browser.js"></script>
```

```html
<script>
  const tau = new TauClient(
    'ws://localhost:8000/ws/twitch-events/',
    'MY_TAU_API_TOKEN'
  );
  tau.connect();

  tau.follows.subscribe((event) => {
    console.log(
      `❤️ ❤️ ❤️ Thanks for following @${event.event_data.user_name}. ❤️ ❤️ ❤️`
    );
  });
</script>
```

### NodeJS

in command line:

```sh
npm install @prosingularity/tau-js
```

Then use via import or require

```ts
import { TauClient } from '@prosingularity/tau-js';
// alternatively use require()
// const { TauClient }  = require('@prosingularity/tau-js');

const port = 8000;
const secretTauApiToken = 'MY_SECRET_TOKEN';
const uri = `ws://localhost:${port}/ws/twitch-events/`;

const tau = new TauClient(uri, secretTauApiToken);
tau.connect();

tau.follows.subscribe((event) => {
  console.log(
    `❤️ ❤️ ❤️ Thanks for following @${event.event_data.user_name}. ❤️ ❤️ ❤️`
  );
});
```

## Development

### Setup

Make sure TAU (backend) is running.

```sh
npm install
npm run build
```

### Examples

#### Example: Browser

```sh
# Adjust port and api token for TAU in index.html
python3 -m http.server 8080 &
google-chrome http://localhost:8080

# check your browser's console for the following message:
# TAU: connected
```

#### Example: NodeJS

```sh
# adjust port and api token for TAU in node.example.ts
# NOTE: requires ts-node installed
ts-node node.example.ts
```

Next, you can run this manual test:

Send a test follow-event with TAU backend.
Your respective console should show the following message:
`Thanks for following @USERNAME.`
