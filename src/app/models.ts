export class UserDetails {
  id: string
  userID: string
  created: string
  updated: string
  name: string
  email: string
  password: string;
  storeID: string;
  phoneno: string;
  role: string;
}

export class StoreDetails {
  id: string
  created: string
  updated: string
  name: string
  pincode: string
  phoneno: string
  address: string;
  facebookURL: string;
  twitterURL: string;
  youtubeURL: string
}


export class Products {
  id: string
  name: string
  weight: string
  store_id: string
  barcode: string
  location: string
  created: string
  updated: string;
}

export class Gallery {
  id: string
  title: string
  description: string
  storeID: string
  filename: string
  created: string
  updated: string;
}

