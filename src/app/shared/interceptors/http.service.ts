import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { nextTick } from 'process';

@Injectable({
  providedIn: 'root'
})
export class HttpService implements HttpInterceptor {

  constructor() { }

  token: string;

  intercept(req, next) {
    this.token = localStorage.getItem('@sasbrasil_token')

    const request = req.clone({
      headers: !req.url.match('/auth') ? req.headers.set('Authorization', `Bearer ${this.token}`) : req.headers
    })

    return next.handle(request)
  }
}
