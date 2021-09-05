import { TauClient } from './client';
import { WebSocketAdapter } from './websocket-adapter';

const tauFollowEvent = {
  id: null,
  event_id: '78fb316c-e8bb-4be8-94cd-7f28745e29a4',
  event_type: 'follow',
  event_source: 'TestCall',
  event_data: {
    user_name: 'helloeverybody',
    user_id: '12345678',
    user_login: 'helloeverybody',
    broadcaster_user_id: '98765432',
    broadcaster_user_name: 'broadcaster-name',
    broadcaster_user_login: 'broadcaster-name',
  },
  created: '2021-09-05T17:32:33.608453+00:00',
  origin: 'test',
};

const makeWsMock = () => ({
  setOnOpen: jest.fn(),
  setOnClose: jest.fn(),
  setOnMessage: jest.fn(),
  send: jest.fn(),
  close: jest.fn(),
});

it('does nothing if only creating an instance without connecting', () => {
  const url = 'ws://localhost:8000';
  const wsMock = makeWsMock();
  jest.spyOn(WebSocketAdapter, 'connect').mockImplementation(() => wsMock);

  const tau = new TauClient(url, 'my-api-token');

  // not a real test. But isomorphic-ws immediately connects to the websocket on object initialization.
  // This 'test' ensures that problem is avoided.
  expect(tau).toBeDefined();
});

it('connects to the api and sends the api token to TAU backend on open', async () => {
  const url = 'ws://localhost:8000';
  const wsMock = makeWsMock();
  jest.spyOn(WebSocketAdapter, 'connect').mockImplementation(() => wsMock);

  const tau = new TauClient(url, 'my-api-token');
  tau.connect();
  const onOpenCb = wsMock.setOnOpen.mock.calls[0][0];
  onOpenCb();

  expect(wsMock.send).toHaveBeenCalledWith({ token: 'my-api-token' });
});

describe('follows', () => {
  it('forwards to the follow event from TAU backend to a registered callback', async () => {
    const url = 'ws://localhost:8000';
    const wsMock = makeWsMock();
    jest.spyOn(WebSocketAdapter, 'connect').mockImplementation(() => wsMock);
    const tau = new TauClient(url, 'my-api-token');
    tau.connect();
    const followMockCb = jest.fn();

    tau.follows.subscribe(followMockCb);

    const onMessageCb = wsMock.setOnMessage.mock.calls[0][0];
    onMessageCb({ data: JSON.stringify(tauFollowEvent) });

    expect(followMockCb).toHaveBeenCalledWith(tauFollowEvent);
  });

  it('forwards to the follow event from TAU backend to many registered callbacks', async () => {
    const url = 'ws://localhost:8000';
    const wsMock = makeWsMock();
    jest.spyOn(WebSocketAdapter, 'connect').mockImplementation(() => wsMock);
    const tau = new TauClient(url, 'my-api-token');
    const followMockCb1 = jest.fn();
    const followMockCb2 = jest.fn();
    const followMockCb3 = jest.fn();
    tau.connect();

    tau.follows.subscribe(followMockCb1);
    tau.follows.subscribe(followMockCb2);
    tau.follows.subscribe(followMockCb3);

    const onMessageCb = wsMock.setOnMessage.mock.calls[0][0];
    onMessageCb({ data: JSON.stringify(tauFollowEvent) });

    expect(followMockCb1).toHaveBeenCalledWith(tauFollowEvent);
    expect(followMockCb2).toHaveBeenCalledWith(tauFollowEvent);
    expect(followMockCb3).toHaveBeenCalledWith(tauFollowEvent);
  });

  it('calls a follow callback every time a new follow event arrives', async () => {
    const url = 'ws://localhost:8000';
    const wsMock = makeWsMock();
    jest.spyOn(WebSocketAdapter, 'connect').mockImplementation(() => wsMock);

    const tau = new TauClient(url, 'my-api-token');
    tau.connect();
    const followMockCb = jest.fn();
    tau.follows.subscribe(followMockCb);
    const onMessageCb = wsMock.setOnMessage.mock.calls[0][0];
    onMessageCb({ data: JSON.stringify(tauFollowEvent) });
    onMessageCb({ data: JSON.stringify(tauFollowEvent) });
    onMessageCb({ data: JSON.stringify(tauFollowEvent) });

    expect(followMockCb).toHaveBeenCalledTimes(3);
  });

  it('does not invoke a follow callback that got unsubscribed', async () => {
    const url = 'ws://localhost:8000';
    const wsMock = makeWsMock();
    jest.spyOn(WebSocketAdapter, 'connect').mockImplementation(() => wsMock);

    const tau = new TauClient(url, 'my-api-token');
    tau.connect();
    const followMockCb = jest.fn();
    const subscription = tau.follows.subscribe(followMockCb);
    const onMessageCb = wsMock.setOnMessage.mock.calls[0][0];
    onMessageCb({ data: JSON.stringify(tauFollowEvent) });
    expect(followMockCb).toHaveBeenCalledTimes(1);

    tau.follows.unsubscribe(subscription);
    onMessageCb({ data: JSON.stringify(tauFollowEvent) });

    expect(followMockCb).toHaveBeenCalledTimes(1);
  });
});
