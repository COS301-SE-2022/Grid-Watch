import { Injectable } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { Delete } from '@nestjs/common';

@Injectable()
export class GoogleMapsService {

  // constructor() { }
  
  public async getLocation(placeID : string) : Promise<string>  {
    // const output;
    // console.log(placeID);
    const geocoder = new google.maps.Geocoder();
    const temp = await geocoder.geocode({placeId : placeID}).then(
      ({results}) => {
        return results[0].formatted_address;
      }
    )
    return temp
  }

  public async getLocationCoord(pos : {lat:number, lng: number}) : Promise<string>  {
    const geocoder = new google.maps.Geocoder();
    // const output;
    const temp = await geocoder.geocode({location : pos}).then(
      ({results}) => {
        return results[0].place_id;
      }
      )
    return temp
  }
  
  public async getCity(placeID : string)
  {
    const geocoder = new google.maps.Geocoder();
    const temp = await geocoder.geocode({placeId : placeID}).then(
      ({results}) => {
        console.log(results);
        return this.getAutocompleteCity(results[0].address_components);
      }
    )
    return temp
  }

public getAutocompleteCity(place: google.maps.GeocoderAddressComponent [] | undefined) : string
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

public createAutoCompleteObject(inputID: string) : google.maps.places.Autocomplete
{
  const input = document.getElementById(inputID) as HTMLInputElement;
    const options = {
      componentRestrictions: { country: ["za"] },
      fields: ["address_components", "geometry", "place_id"],
      types: ["address"],
    };
    return new google.maps.places.Autocomplete(input, options);
}

public createAutoCompleteObjectCities(inputID: string) : google.maps.places.Autocomplete
{
  const input = document.getElementById(inputID) as HTMLInputElement;
    const options = {
      componentRestrictions: { country: ["za"] },
      fields: ["address_components", "geometry", "place_id"],
      types: ["locality"],
    };
    return new google.maps.places.Autocomplete(input, options);
}

public createMapObject(elementID : string, center : google.maps.LatLngLiteral, zoom: number)
{
  return new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: center,
    zoom: zoom,
  });
}


public createMarkerObject(position: google.maps.LatLngLiteral, map: google.maps.Map, title :string)
{
  return new google.maps.Marker({
    position: position,
    map: map,
    title: title
  });
}

public async getCoordinates(placeID : string)
{
  console.log(placeID);
  const geocoder = new google.maps.Geocoder();
    const temp = await geocoder.geocode({placeId : placeID}).then(
      ({results}) => {
        console.log(results[0]);
        return results[0].geometry.location;
      },
      (error) =>
      {console.log(error);}
      
    )
    return temp
}
}
