import { Component } from '@angular/core';

@Component({
  selector: 'app-recycle',
  templateUrl: './recycle.component.html',
  styleUrls: ['./recycle.component.scss']
})
export class RecycleComponent {
  mapOptions: google.maps.MapOptions = {
    center: { lat: 38.9987208, lng: -77.2538699 },
    zoom : 14
  }
  marker = {
    position: { lat: 38.9987208, lng: -77.2538699 },
  }

  options: any;

  overlays: any[] | undefined;

  ngOnInit() {
    this.options = {
      center: {lat: 36.890257, lng: 30.707417},
      zoom: 12
    };
  }

}
