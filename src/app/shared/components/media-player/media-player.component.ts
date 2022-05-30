import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/service/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {

  mockCover: TrackModel = {
    name: "BEBE (Official Video)",
    album: "Giolì & Assia",
    cover: "https://i.scdn.co/image/ab67616d0000b27345ca41b0d2352242c7c9d4bc",
    url: "http://localhost:3000/track-3.mp3",
    _id: 1
  }

  listObservers$: Array<Subscription> = [];
  constructor(private multimediaService: MultimediaService) { }

  ngOnDestroy(): void {
    this.listObservers$.forEach(obs => obs.unsubscribe);
  }

  ngOnInit(): void {
    const observer1$: Subscription = this.multimediaService.callback.subscribe(
      (response: TrackModel) => {
        console.log("Reciebiendo cancion....", response);
      }
    )

    this.listObservers$ = [observer1$]
  }

}
