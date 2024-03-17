export interface UserData {
  id: number;
  email: string;
  username: string;
  password: string;
  phone: string;
  __v: number;
  name: {
    firstName: string;
    lastName: string;
  };
  address: {
    geolocation: {
      lat: string;
      long: string;
    };
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
}
