import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/service/track.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css']
})
export class TrackPageComponent implements OnInit, OnDestroy {

  tracksTrending:Array<TrackModel> = [];
  tracksRandom:Array<TrackModel> = [];

  listObservers$: Array<Subscription> = [];

  constructor(private trackService: TrackService) { }


  ngOnInit(): void {
    const trackTrandingObserver$ = this.trackService.dataTracksTrending$
      .subscribe(response => {
        this.tracksTrending = response;
        console.log('Canciones trending --> ', response);
    });

    const trackRandomObserver$ = this.trackService.dataTracksRandom$
      .subscribe(response => {
        this.tracksRandom = [... this.tracksRandom, ... response];
        console.log('Canciones Random --> ', response);
    });

    this.listObservers$ = [trackTrandingObserver$, trackRandomObserver$];
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(obs => obs.unsubscribe())
  }

}
