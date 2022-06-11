import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  // constructor() { }

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

public getAutocompleteCity(place: any) : string
{
  // console.log(place);
  if (place !== undefined)
  {
    // const place = this.autocomplete.getPlace().address_components;
   
    const count = place.length as number
    // console.log(place);
    
    for (let k = 0; k < count ; k++)
    {
      let count2 = 0;
      if (place)
      {
        count2 = place[k].types.length as number;
      }
      for (let i = 0; i < count2 ; i++)
      {
        if (place)
          if (place[k].types[i] === "locality")
          {
            return place[k].long_name
          }
          
      }
      // if (this.autocomplete.getPlace().address_components[k].types === "")
      // this.ticket.ticket_city = 
    }
   
    for (let k = 0; k < count ; k++)
    {
      let count2 = 0;
      if (place)
      {
        count2 = place[k].types.length as number;
      }
      for (let i = 0; i < count2 ; i++)
      {
        if (place)
          if (place[k].types[i] === "sublocality")
          {
            return place[k].long_name
          }
          
      }
      // if (this.autocomplete.getPlace().address_components[k].types === "")
      // this.ticket.ticket_city = 
      }
    
  }
  return "";
}
  
public async getCurrentLocation() : Promise<GeolocationCoordinates>
{
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => { 
        resolve(position.coords);
      }, (err) => {
        reject(err);
      });
    });
    
}

}
