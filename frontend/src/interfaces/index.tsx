export interface Customer {
  ID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  UserTypeID: number;
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
  Customer: Customer;

}

// export interface Employee {
//   ID: number;
//   EmployeeType: EmployeeType;
//   Gender: Gender;
//   FirstName: string;
//   LastName: string;
//   Email: string;
//   Password: string;
//   Phone: string;
// }

// export interface EmployeeType {
//   ID: number;
//   Name: string;
// }

export interface StatusType {
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
  MenuTypeID: number;
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
