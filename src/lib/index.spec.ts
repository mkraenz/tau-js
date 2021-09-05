import { TauClient } from './client';

it('connects to the api and receives connected event', async () => {
  const url = 'ws://localhost:8000';
  const tau = new TauClient(url, 'my-api-token');
  const wsMock = {
    onopen: jest.fn(),
    onclose: jest.fn(),
    onmessage: jest.fn(),
    send: jest.fn(),
    close: jest.fn(),
  };

  tau['_WebSocketFactory'] = () => wsMock;

  tau.connect();

  wsMock.onopen();
  expect(wsMock.send).toHaveBeenCalledWith('{"token":"my-api-token"}');
});
