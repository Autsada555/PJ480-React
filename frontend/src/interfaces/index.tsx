// export interface User {
//   [x: string]: any;
  
//   ID: number;
//   FirstName: string;
//   LastName: string;
//   Email: string;
//   Phone: string;
//   Address: string;
//   District: string;
//   Province: string;
//   Postcode: string;

//   UserTypeID: number;
//   GenderID: number;
//   Gender: Gender;
//   UserType: UserType;
//   // Genderts: string;
//   // UserTypets: string;
// }
export interface User {
  [x: string]: any;

  ID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Password?: string;
  Phone: string;
  UserName?: string;
  Address: string;
  District: string;
  Province: string;
  Postcode: string;
  GenderID: number;
  UserTypeID: number;

  Gender: Gender;
  UserType: UserType;
}



export interface Gender {
  ID: number;
  Name: string;
}

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
  User: User;
}

export interface Delivery {
  ID: number;
  Name: string;
  User: User;
}

export interface Order {
  ID: number;
  Quantity: number;
  Total: number;
  User: User;
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
  User: User;
}

export interface HistoryOrder {
  ID: number;
  Date: Date;
  StatusType: StatusType;
  Order: Order;
}
