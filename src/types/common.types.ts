export interface IOrder {
  _id: string;
  number: string;
  isPaid: boolean;
  createdAt: string;
  storeId: string;
  customerId: string;
  stateId: string;
  itemPrice: number;
  totalPrice: number;
  addressName: string;
  addressLocation: {
    latitude: number;
    longitude: number;
  };
  houseNumber: string;
  entrance: string;
  apartmentNumber: string;
  floor: string;
  paymentType: string;
  comment: string;
  state: {
    _id: string;
    state: string;
    color: string;
    name: string;
  };
  customer: {
    _id: string;
    firstName: string;
    phoneNumber: string;
    lastName: string;
  };
  items: {
    _id: string;
    productId: string;
    price: number;
    amount: number;
    product: {
      _id: string;
      name: string;
      mainImage: {
        _id: string;
        url: string;
        sizes: {
          url: string;
          width: number;
          height: number;
        }[];
      };
    };
  }[];
}

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  salePrice: number;
  inStock: number;
  amount: number;
  mainImage: {
    _id: string;
    url: string;
    sizes: string[];
  };
}

export interface ILocation {
  latitude: number;
  longitude: number;
}

export const REGIONS = [
  {
    _id: "toshkent",
    name: "Toshkent",
  },
];

export const DISTRICTS = [
  {
    _id: "Uchtepa",
    name: "Uchtepa tumani",
  },
  {
    _id: "Bektemir",
    name: "Bektemir tumani",
  },
  {
    _id: "Mirzo Ulugbek",
    name: "Mirzo Ulugbek tumani",
  },
  {
    _id: "Mirobod",
    name: "Mirobod tumani",
  },
  {
    _id: "Sergeli",
    name: "Sergeli tumani",
  },
  {
    _id: "Olmazar",
    name: "Olmazar tumani",
  },
  {
    _id: "Chilonzar",
    name: "Chilonzar tumani",
  },
  {
    _id: "Shayxontohur",
    name: "Shayxontohur tumani",
  },
  {
    _id: "Yunusobod",
    name: "Yunusobod tumani",
  },
  {
    _id: "Yakkasaroy",
    name: "Yakkasaroy tumani",
  },
  {
    _id: "Yashnobod",
    name: "Yashnobod tumani",
  },
];
