import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private url = "/api/v1/likes"

  constructor(private http: HttpClient) { }

  getLikedVideos(){
    return this.http.get(`${this.url}/videos`);
  }

  toggleVideoLikes(id){
    return this.http.post(`${this.url}/toggle/v/${id}`, {});
  }
}
