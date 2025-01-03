
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
  GenderID: number;
  UserTypeID: number;

  Gender: Gender;
  UserType: UserType;
}

export interface UserID {
  [x: string]: any;

  ID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Address: string;
  GenderID: number;

  Gender: Gender;
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

export interface DiseaseInterface {
  ID: number;
  Name: string;
  Menus: Menu[];
}

export interface Order {
  Quantity: number;
  TotalAmount: number;
  DateDelivery: Date;
  Eslip: string;
  Delivery: string;

  Menu: MenuOrder[];
  UserID: number;
  StatusTypeID: number;
}

export interface OrderHistory {
  ID: number;
  Quantity: number;
  TotalAmount: number;
  DateDelivery: Date;
  Eslip: string;
  Delivery: string;

  Menu: Menu[];
  UserID: number;
  StatusType: StatusType;
  StatusTypeID: number;
}

export interface OrderCheckPayment {
  ID: number;
  Quantity: number;
  TotalAmount: number;
  DateDelivery: Date;
  Eslip: string;
  Delivery: string;

  Menu: MenuOrder[];
  UserID: number;
  User: User;
  StatusTypeID: number;
  StatusType: StatusType;
}

export interface CancelOrderData {
  StatusTypeID: number;
  id?: number;
}

export interface Menu {
  ID?: number;
  Name: string;
  Cost: number;
  Description: string;
  Component: string[];
  MenuImage: string;
  DiseaseTypeID: number[];
  Diseases?: DiseaseInterface[];
  MenuTypeID: number;
  MenuType?: MenuType;
}


export interface MenuOrder {
  Quantity: number;
  Menu: Menu;
  details: string;
}

