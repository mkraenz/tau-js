import WebSocket from 'isomorphic-ws';

export type IWebSocket = Omit<WebSocketAdapter, 'ws'>;

export class WebSocketAdapter {
  public static connect(url: string): IWebSocket {
    return new WebSocketAdapter(new WebSocket(url));
  }

  private constructor(private readonly ws: WebSocket) {}

  public send(data: object) {
    this.ws.send(JSON.stringify(data));
  }

  public close() {
    this.ws.close();
  }

  public setOnOpen(callback: WebSocket['onopen']) {
    this.ws.onopen = callback;
  }

  public setOnClose(callback: WebSocket['onclose']) {
    this.ws.onclose = callback;
  }

  public setOnMessage(callback: WebSocket['onmessage']) {
    this.ws.onmessage = callback;
  }
}
