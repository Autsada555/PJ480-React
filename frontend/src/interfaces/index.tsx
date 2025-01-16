
export interface User {
  [x: string]: unknown;

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
  [x: string]: unknown;

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

export interface StatusOrderType {
  ID: number;
  Name: string;
}

export interface StatusPaymentType {
  ID: number;
  Name: string;
}

export interface StatusDeliveryType {
  ID: number;
  Name: string;
}

export interface UserType {
  ID: number;
  Name: string;
}

export interface MenuTypeInterface {
  ID: number;
  Name: string;
}

export interface DiseaseInterface {
  ID: number;
  Name: string;
  Menus: MenuInterface[];
}


export interface MenuInterface {
  ID: number;
  Name: string;
  Cost: number;
  Description: string;
  Component: string[];
  MenuImage: string;
  DiseasesID?: number[];
  Diseases?: DiseaseInterface[];
  MenuTypeID: number;
  MenuType: MenuTypeInterface;
}

export interface CreateMenuInterface {
  Name: string;
  MenuTypeID: number;
  Cost: number;
  Description: string;
  Component: string[];
  MenuImage: string;
  DiseasesID: number[];
}

export interface Order {
  Quantity: number;
  TotalAmount: number;
  DateDelivery: Date;
  Eslip: string;
  Delivery: string;

  Menu: MenuOrder[];
  UserID: number;
  StatusOrderTypeID: number;
  StatusPaymentTypeID: number;
  StatusDeliveryTypeID: number;

}

export interface OrderHistory {
  ID: number;
  Quantity: number;
  TotalAmount: number;
  DateDelivery: Date;
  Eslip: string;
  Delivery: string;

  Menu: MenuInterface[];
  UserID: number;
  StatusOrderType: StatusOrderType;
  StatusOrderTypeID: number;
  StatusPaymentType: StatusPaymentType;
  StatusPaymentTypeID: number;
  StatusDeliveryType: StatusDeliveryType;
  StatusDeliveryTypeID: number;
  User: User;
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
  StatusOrderType: StatusOrderType;
  StatusOrderTypeID: number;
  StatusPaymentType: StatusPaymentType;
  StatusPaymentTypeID: number;
  StatusDeliveryType: StatusDeliveryType;
  StatusDeliveryTypeID: number;
}

export interface CancelOrderData {
  StatusOrderTypeID: number;
  id?: number;
}

export interface MenuOrder {
  Quantity: number;
  Menu: MenuInterface;
  details: string;
}

