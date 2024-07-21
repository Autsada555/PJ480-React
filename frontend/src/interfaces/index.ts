export interface Customer {
    ID: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Phone: string;
    GenderID: number;
    Gender: Gender;
    Address: Address;
  }

  export interface Gender {
    ID: number;
    Name: string;
  }

  export interface Address {
    ID: number;
    Address: string;
    District: string;
    Province: string;
    Postcode: number;

  }
