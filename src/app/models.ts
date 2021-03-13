export class UserDetails {
  id: string
  created: string
  updated: string
  name: string
  email: string
  password: string;
  storeID: string;
}


export class Products {
  id: string
  name: string
  weight: string
  storeID: string
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

