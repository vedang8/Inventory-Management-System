import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: Socket;
  private url = 'http://localhost:8000'; // Adjust your backend URL

  constructor() {
    this.socket = io(this.url, {
      auth: {
        token: localStorage.getItem('token')
      }
    });
  }

  listen(eventName: string): Observable<any> {
    return new Observable(observer => {
      this.socket.on(eventName, (data: any) => {
        observer.next(data);
      });
    });
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}