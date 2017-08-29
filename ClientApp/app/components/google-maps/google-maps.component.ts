import { FormControl } from '@angular/forms';
import { ElementRef, NgZone, Component, OnInit, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'rb-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  marker: google.maps.Marker;
  markers: google.maps.Marker[] = [];
  request;
  map: google.maps.Map;
  places: any[] = [];
  currentLocation: any;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    try {
      this.locationSearch();

      //this.setMarkers();
      var uluru = { lat: 45.815399, lng: 15.966568 };
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: uluru
      });

      this.executeNearbySearch(uluru);

      google.maps.event.addListener(this.map, 'dragend', () => {
        this.currentLocation = this.map.getCenter();
        if (this.markers.length > 0)
          this.RemoveMarkers();

        this.executeNearbySearch(this.currentLocation);
      });

      google.maps.event.addListener(this.map, 'click', (event) => {
        this.addMarker(event.latLng);
      });

    } catch (error) {
      console.log(error);
    }
  }

  private locationSearch() {
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  setMarkers() {
    var uluru = { lat: 45.815399, lng: 15.966568 };
    var uluru2 = { lat: 45.825313, lng: 15.976513 };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: uluru
    });
    this.marker = new google.maps.Marker({
      position: uluru,
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      title: "Hello World!"
    });
    var marker2 = new google.maps.Marker({
      position: uluru2,
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      title: "Repsly Zgb"
    });

    this.marker.addListener('click', this.toggleBounce);
  }

  toggleBounce() {
    if (this.marker.getAnimation() !== null) {
      this.marker.setAnimation(null);
    } else {
      this.marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

  executeNearbySearch(currentLocation: any) {
    this.request = {
      location: currentLocation,
      radius: '600',
      type: ['bar']
    };

    var service = new google.maps.places.PlacesService(this.map);

    service.nearbySearch(this.request, (results, status, pagination) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        this.createMarkers(results);

        if (pagination.hasNextPage) {
          var moreButton = <HTMLInputElement>document.getElementById('more');

          moreButton.disabled = false;

          moreButton.addEventListener('click', function () {
            moreButton.disabled = true;
            pagination.nextPage();
          });
        }
      }
    });
  }

  createMarkers(places) {
    try {
      var bounds = new google.maps.LatLngBounds();
      var placesList = document.getElementById('places');

      for (var i = 0, place; place = places[i]; i++) {
        var image = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        this.marker = new google.maps.Marker({
          map: this.map,
          icon: image,
          title: place.name,
          position: place.geometry.location
        });

        this.places.push(place);

        console.log(this.marker);
        this.markers.push(this.marker);

        //this.places = places;
        //placesList.innerHTML += '<li style="border: 1px solid rgba(0,0,0,0.2); padding:5px;">' + place.name + '</li>';

        bounds.extend(place.geometry.location);
      }
      this.map.fitBounds(bounds);
    } catch (error) {
      console.log(error);
    }
    console.log(this.places);
  }

  // Adds a marker to the map and push to the array.
  addMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: this.map
    });
    this.markers.push(marker);
  }

  RemoveMarkers() {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.places = [];
  }






  getMoveData() {
    this.currentLocation = this.map.getCenter();
    console.log("Current location: " + this.currentLocation);
    var newCurrLocation = this.currentLocation.toString();
    newCurrLocation = newCurrLocation.replace('(', '');
    newCurrLocation = newCurrLocation.replace(')', '');

    var latlngArray = new Array();
    latlngArray = newCurrLocation.split(",")
    for (var a in latlngArray) {
      latlngArray[a] = parseFloat(latlngArray[a]);
    }
    var newLat = latlngArray[0]
    var newLng = latlngArray[1]
    this.map.setCenter({
      lat: newLat,
      lng: newLng
    });

    this.executeNearbySearch(this.currentLocation);
  }

  // processResults(results, status, pagination) {
  //   if (status !== google.maps.places.PlacesServiceStatus.OK) {
  //     return;
  //   } else {
  //     console.log(results);
  //     this.createMarkers(results);
  //     this.places = results;

  //     if (pagination.hasNextPage) {
  //       var moreButton = <HTMLInputElement> document.getElementById('more');

  //       moreButton.disabled  = false;

  //       moreButton.addEventListener('click', function() {
  //         moreButton.disabled = true;
  //         pagination.nextPage();
  //       });
  //     }
  //   }
  // }

  getUrlForPhoto(place: any) {
    var url = place.photos[0].getUrl({ 'maxWidth': 45, 'maxHeight': 45 });
    return url;
  }
}