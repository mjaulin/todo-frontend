import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];

  add(message: string) {
    this.messages.unshift(message);
    if (this.messages.length > 3) {
      this.messages.splice(3, this.messages.length);
    }
  }

  delete(index: number) {
    this.messages = this.messages.slice(index + 1)
  }

}
