// import { addDays } from "date-fns";
import { z } from "zod";

export const userFormSchema = z.object({
    FirstName: z.string().min(2, "FirstName must be at least 2 characters"),
    LastName: z.string().min(2, "LastName must be at least 2 characters"),
    Email: z.string().email({ message: "Invalid email address" }),
    Password: z.string().min(8, "Password must be at least 8 characters"),
    Phone: z.string().length(10, "Phone number must be 10 characters"),
    UserName: z.string().min(2, "UserName must be at least 2 characters"),
    Address: z.string().min(2, "Address must be at least 2 characters"),
    District: z.string().min(2, "District must be at least 2 characters"),
    Province: z.string().min(2, "Province must be at least 2 characters"),
    Postcode: z.string().length(5, "Postcode must be 5 characters"),

    GenderID: z.number({ required_error: "Please select gender" }),
    UserTypeID: z.number({ required_error: "Please select user type" }),

  });
  
  export type UserFormData = z.infer<typeof userFormSchema>;

  export const userUpdateFormSchema = z.object({
    FirstName: z.string().min(2, "FirstName must be at least 2 characters"),
    LastName: z.string().min(2, "LastName must be at least 2 characters"),
    Email: z.string().email({ message: "Invalid email address" }),
    Phone: z.string().length(10, "Phone number must be 10 characters"),
    Address: z.string().min(2, "Address must be at least 2 characters"),
    District: z.string().min(2, "District must be at least 2 characters"),
    Province: z.string().min(2, "Province must be at least 2 characters"),
    Postcode: z.string().length(5, "Postcode must be 5 characters"),

    GenderID: z.number({ required_error: "Please select gender" }),
  });
  
  export type UserUpdateFormData = z.infer<typeof userUpdateFormSchema>;

  export const menuFormSchema = z.object({
    Name: z.string().min(1, "Name is required"),
    Cost: z
    .number({ required_error: "Cost is required" })
    .nonnegative(),
    Description: z.string().min(1, "Description is required"),
    Image: z.string(),
    Component: z.string().min(1, "Component is required"),
    DiseaseTypeID: z.number({ required_error: "Please select a Disease Type" }),
    MenuTypeID: z.number({ required_error: "Please select a Menu Type" }),
  });
  
  export type MenuFormData = z.infer<typeof menuFormSchema>;

  export const menuUpdateSchema = z.object({
    Name: z.string().min(1, "Name is required"),
    Cost: z
    .number({ required_error: "Cost is required" })
    .nonnegative(),
    Description: z.string().min(1, "Description is required"),
    Image: z.string(),
    Component: z.string().min(1, "Component is required"),
    DiseaseTypeID: z.number({ required_error: "Please select a Disease Type" }),
    MenuTypeID: z.number({ required_error: "Please select a Menu Type" }),
  });
  
  export type MenuUpdateData = z.infer<typeof menuUpdateSchema>;

  // export const addressFormSchema = z.object({
  //   Address: z.string().min(2, "Address must be at least 2 characters"),
  //   District: z.string().min(2, "District must be at least 2 characters"),
  //   Province: z.string().min(2, "Province must be at least 2 characters"),
  //   Postcode: z.string().length(5, "Postcode must be 5 characters"),
  // });
  
  // export type AddressFormData = z.infer<typeof addressFormSchema>;

  // export const addressUpdateSchema = z.object({
  //   Address: z.string().min(2, "Address must be at least 2 characters"),
  //   District: z.string().min(2, "District must be at least 2 characters"),
  //   Province: z.string().min(2, "Province must be at least 2 characters"),
  //   Postcode: z.string().length(5, "Postcode must be 5 characters"),
  // });
  
  // export type AddressUpdateData = z.infer<typeof addressUpdateSchema>;

  export const paymentFormSchema = z.object({
    Address: z.string().min(2, "Address must be at least 2 characters"),
    District: z.string().min(2, "District must be at least 2 characters"),
    Province: z.string().min(2, "Province must be at least 2 characters"),
    Postcode: z.string().length(5, "Postcode must be 5 characters"),

    PaymentTypeID: z.number({ required_error: "Please select payment type" }),
    DeliveryTypeID: z.number({ required_error: "Please select delivery type" }),

  });
  
  export type PaymentFormData = z.infer<typeof paymentFormSchema>;
