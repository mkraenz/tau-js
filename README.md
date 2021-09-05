# tau-js

Client-side library for TAU - Twitch Api Unifier. Browser and NodeJS support. Full Typescript support.

## Setup

Make sure TAU (backend) is running.

```sh
npm install
npm run build
```

Run the Browser example:

```sh
# Adjust port and api token for TAU in index.html
python3 -m http.server 8080 &
google-chrome http://localhost:8080

# check your browser's console for the following message:
# TAU: connected
```

Run the NodeJS example:

```sh
# adjust port and api token for TAU in node.example.ts
# NOTE: requires ts-node installed
ts-node node.example.ts
```

Next, you can run this manual test:

Send a test follow-event with TAU backend.
Your respective console should show the following message:
`Thanks for following @USERNAME.`
