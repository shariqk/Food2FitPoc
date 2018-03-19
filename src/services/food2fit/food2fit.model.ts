

export class FoodSearchResult {
  total : number;
  searchId : string;
  places : Array<FoodPlace> = new Array<FoodPlace>();

}


export class FoodPlace {
  name : string;
  address : string;
  latitude : string;
  longitude : string;
  items : Array<FoodItem>;
}


export class FoodItem {
  name : string;
  description : string;
  calories : string;
  fat : string;
  sodium : string;
  cholestrol : string;

}

export class UserProfile {
  name : string;
  email : string;

  allergies : UserProfileAllergies = new UserProfileAllergies();
}

export class UserProfileAllergies {
  milk : boolean = false;
  eggs : boolean = true;
  fish : boolean = true;
  shellfish : boolean = false;
  treenuts : boolean;
  peanuts : boolean;
  wheat  : boolean;
  soybeans : boolean;
  gluten : boolean;
}

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
