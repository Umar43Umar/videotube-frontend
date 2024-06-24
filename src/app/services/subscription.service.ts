import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private url = "/api/v1/subscriptions"

  constructor(private http: HttpClient) { }
  getSubscribers(id){
    return this.http.get(`${this.url}/c/${id}`);
  }
  toggleSubscription(id){
    return this.http.post(`${this.url}/c/${id}`, {}, { withCredentials: true });
  }
}
