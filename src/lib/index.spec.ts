import { TauClient } from './client';

it('connects to the api and receives connected event', async () => {
  const url = 'ws://localhost:8000';

  const tau = new TauClient(url, 'my-api-token');

  const spy = jest.fn();
  tau.on('connected', spy);

  tau.connect();

  expect(spy).toHaveBeenCalled();
  expect.assertions(1);
});
