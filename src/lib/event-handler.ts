type RegistrationId = string;

export interface IEventHandler<T> {
  /** set the given callback function up for receiving events. Returns an id for unsubscribing the callback. */
  subscribe(callback: (event: T) => void): RegistrationId;
  unsubscribe(subscriptionId: RegistrationId): void;
  unsubscribeAll(): void;
}

export class EventHandler<T> implements IEventHandler<T> {
  private _subscribers: { [id: string]: (event: T) => void } = {};

  public subscribe(callback: (event: T) => void): RegistrationId {
    const id = Math.random().toString().slice(2);
    this._subscribers[id] = callback;
    return id;
  }

  public unsubscribe(id: RegistrationId) {
    delete this._subscribers[id];
  }

  public unsubscribeAll() {
    this._subscribers = {};
  }

  public _invoke(event: T) {
    Object.values(this._subscribers).forEach((cb) => cb(event));
  }
}
