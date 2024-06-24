import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { LikeService } from 'src/app/services/like.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  videoId: string;
  video: any;
  user: any;
  liked: boolean;
  subscribed: boolean;
  subscribers: any[];
  subscribersCount: number;
  currUserId: string;
  subscribersArray: string[] = [];
  videoIdsArray: string[] = [];

  private routeSubscription: Subscription;
  private videoSubscription: Subscription;
  private userSubscription: Subscription;
  private currUserSubscription: Subscription;
  private likeSubscription: Subscription;
  private subsSubscription: Subscription;
  private likedSubscription: Subscription;
  private getSubsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private userService: UserService,
    private likeService: LikeService,
    private subsService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.videoId = params['id'];
      this.loadVideoById(this.videoId);
    });
    this.currUserSubscription = this.userService.user$.subscribe(
      (user) => {
        this.user = user;
        if (this.user) {
          this.currUserId = this.user._id;
        }
      }
    );
    // Check initial liked status
    this.checkLiked();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  unsubscribeAll(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.videoSubscription) {
      this.videoSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.likeSubscription) {
      this.likeSubscription.unsubscribe();
    }
    if (this.getSubsSubscription) {
      this.getSubsSubscription.unsubscribe();
    }
    if (this.subsSubscription) {
      this.subsSubscription.unsubscribe();
    }
    if (this.currUserSubscription) {
      this.currUserSubscription.unsubscribe();
    }
    if (this.likedSubscription) {
      this.likedSubscription.unsubscribe();
    }
  }

  loadVideoById(id: string): void {
    this.videoSubscription = this.videoService.getVideosById(id).subscribe(
      (res: any) => {
        this.video = res.data[0];
        this.getChannel(this.video.owner.username);
      },
      (error) => {
        console.error('Error fetching video:', error);
      }
    );
  }

  getChannel(ownerId: string): void {
    this.userSubscription = this.userService.getUserChannel(ownerId).subscribe(
      (res: any) => {
        this.user = res.data;
        this.subscribersCount = this.user.subscribersCount;
        this.checkSubscription();
        this.checkLiked()
      },
      (error) => {
        console.error('Error fetching channel:', error);
      }
    );
  }

  checkSubscription(): void {
    this.subsSubscription = this.subsService.getSubscribers(this.user?._id).subscribe((req: any) => {
      this.subscribers = req.data.subscribers;
      this.subscribersArray = [];
      req.data.subscribers.forEach(element => {
        this.subscribersArray.push(element?._id);
      });
      this.subscribed = this.subscribersArray.includes(this.currUserId);
    }, error => {
      console.error('Error fetching subscribers:', error);
    });
  }

  checkLiked(): void {
    this.likeSubscription = this.likeService.getLikedVideos().subscribe(
      (res: any) => {
        this.videoIdsArray = res.data.likedVideos || []; // Agar empty array aata hai to handle karein
        this.liked = this.videoIdsArray.includes(this.videoId);
      },
      (error) => {
        console.error('Liked videos fetch mein error:', error);
        // Error ko handle karein jaise ki user ko message dikhakar
      }
    );
  }
  
  
  
  toggleLike(): void {
    this.likeSubscription = this.likeService.toggleVideoLikes(this.videoId).subscribe(
      () => {
        // Toggle hone ke baad liked status update karein
        this.liked = !this.liked;
  
        // Toggle ke baad liked videos array ko refresh karne ke liye optional hai
        this.checkLiked();
      },
      (error) => {
        console.error('Like toggle karne mein error:', error);
        // Error ko handle karein jaise ki user ko message dikhakar
      }
    );
  }
  
  
  toggleSubscription(): void {
    this.getSubsSubscription = this.subsService.toggleSubscription(this.user._id).subscribe(() => {
      this.subscribed = !this.subscribed;
      this.getSubscribers(this.user._id);
    }, error => {
      console.error('Error toggling subscription:', error);
    });
  }

  getSubscribers(id: string): void {
    this.getSubsSubscription = this.subsService.getSubscribers(id).subscribe((res: any) => {
      this.subscribersCount = res.data.total;
    }, error => {
      console.error('Error fetching subscribers count:', error);
    });
  }

}
