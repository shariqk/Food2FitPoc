
export class EatStreetSearchResult {
  restaurants : Array<Restaurant> = new Array<Restaurant>();
}

export class Restaurant {
  apiKey : string;
  logoUrl : string;
  name : string;
  streetAddress : string;
  city : string;
  state : string;
  zip : string

  foodTypes : string[];

}
