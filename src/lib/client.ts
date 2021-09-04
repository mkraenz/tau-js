import WebSocket from 'isomorphic-ws';

type Events = 'connected' | 'follow' | 'subscribe';

export class TauClient {
  private ws: WebSocket;
  private apiToken: string;

  constructor(url: string, tauApiToken: string) {
    this.ws = new WebSocket(url);
    this.apiToken = tauApiToken;
  }

  public connect() {
    this.ws.onopen = () => {
      console.log('connected');
      this.ws.send(JSON.stringify({ token: this.apiToken }));
    };

    this.ws.onclose = () => {
      console.log('disconnected');
    };

    this.ws.onmessage = (data) => {
      console.log('message received', data);
      this.ws.send(Date.now());
    };
  }

  public close() {
    this.ws.close();
  }

  public on(event: Events, callback: (data: any) => void) {}
}

// TODO: is this needed?
if (typeof window !== 'undefined') {
  (window as any).TauClient = TauClient;
}
