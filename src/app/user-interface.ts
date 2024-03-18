export interface UserData {
  id: number;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  phone: string;
  __v: number;
  name: {
    firstname: string;
    lastname: string;
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
