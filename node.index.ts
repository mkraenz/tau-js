import { TauClient } from './build/main/index';

const port = 7400;
const uri = `ws://localhost:${port}/ws/twitch-events/`;
const secretApiToken = 'MY_TOKEN';
const tau = new TauClient(uri, secretApiToken);
tau.connect();
