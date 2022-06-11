import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  constructor() { }

  public async getLocation(placeID : string) : Promise<string>  {
    const geocoder = new google.maps.Geocoder();
    // const output;
    const temp = await geocoder.geocode({placeId : placeID}).then(
      ({results}) => {
        return results[0].formatted_address;
      }
    )
    return temp
}

  

  
}
