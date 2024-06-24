import { Component, OnInit, OnDestroy } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit, OnDestroy {
  videos;
  data;
  private videosSubscription: Subscription;

  constructor(private router: Router, private videoService: VideoService) {}

  ngOnInit(): void {
    this.videosSubscription = this.videoService.getAllVideos().subscribe(
      (res) => {
        this.data = res;
        this.videos = this.data.data
        // console.log(this.data) 
      },
      (error) => {
        console.error('Error fetching videos:', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.videosSubscription) {
      this.videosSubscription.unsubscribe();
    }
  }
  onVideoClick(videoId: string): void {
    this.router.navigate(['/video-player', videoId]);
  }
}
