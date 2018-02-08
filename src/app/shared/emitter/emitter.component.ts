import {
  Injectable,
  EventEmitter
} from '@angular/core';

@Injectable()
export class EmitterService {
  public static _emitters: { [channel: string]: EventEmitter<any> } = {};

  public static get (channel: string): EventEmitter<any> {
    if (!this._emitters[channel]) {
      this._emitters[channel] = new EventEmitter();
    }
    return this._emitters[channel];
  }

  public static remove (channel: string): any {
    this._emitters[channel].unsubscribe();
    delete this._emitters[channel];
    return this._emitters[channel];
  }

  public static clear (channel): any {
    let self = this;
    for (let i = 0; i < channel.length; i++) {
      /** */
      if (self._emitters[channel[i]] && self._emitters[channel[i]].unsubscribe) {
        self._emitters[channel[i]].unsubscribe();
        delete self._emitters[channel[i]];
        return self._emitters[channel[i]];
      }
    }

    return false;
  }
}