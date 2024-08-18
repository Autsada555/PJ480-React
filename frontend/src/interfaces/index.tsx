export interface Customer {
  
  ID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Address: string;
  District: string;
  Province: string;
  Postcode: string;

  UserTypeID: number;
  GenderID: number;
  Gender: Gender;

}
// export interface Customer {
//   ID: number;
//   FirstName: string;
//   LastName: string;
//   Gender: { Name: string };
//   UserTypeID: string;
//   Email?: string;
//   Phone?: string;
//   Address?: string;
//   District?: string;
//   Province?: string;
//   Postcode?: string;
// }


export interface Gender {
  ID: number;
  Name: string;
}

// export interface Address {
//   ID: number;
//   Address: string;
//   District: string;
//   Province: string;
//   Postcode: number;
//   Customer: Customer;

// }

export interface StatusType {
  ID: number;
  Name: string;
}

export interface UserType {
  ID: number;
  Name: string;
}

export interface MenuType {
  ID: number;
  Name: string;
}

export interface DiseaseType {
  ID: number;
  Name: string;
}

export interface Payment {
  ID: number;
  Name: string;
  Customer: Customer;
}

export interface Delivery {
  ID: number;
  Name: string;
  Customer: Customer;
}

export interface Order {
  ID: number;
  Quantity: number;
  Total: number;
  Customer: Customer;
  Menu: Menu;
}

export interface Menu {
  ID: number;
  Name: string;
  Cost: number;
  Description: string;
  Component: string;
  MenuImage: string;
  DiseaseTypeID: number;
  DiseaseType : DiseaseType;
  MenuTypeID: number;
  MenuType: MenuType;
}

export interface Checkpayment {
  ID: number;
  Date: Date;
  SlipImage: string;
  StatusTypeID: number;
  Order: Order;
  Customer: Customer;
}

export interface HistoryOrder {
  ID: number;
  Date: Date;
  StatusType: StatusType;
  Order: Order;
}
