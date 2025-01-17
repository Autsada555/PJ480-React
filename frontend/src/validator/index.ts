// import { addDays } from "date-fns";
import { z } from "zod";

export const userFormSchema = z.object({
    FirstName: z.string(),
    LastName: z.string(),
    Email: z.string().email({ message: "Invalid email address" }),
    Password: z.string().min(8, "Password must be at least 8 characters"),
    Phone: z.string().length(10, "Phone number must be 10 characters"),
    UserName: z.string(),
    Address: z.string(),
    CreditCardNumber: z.string().length(10, "Phone number must be 10 characters"),
    GenderID: z.number(),
    UserTypeID: z.number(),

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
    UserTypeID: z.number({ required_error: "Please select user type" }),
    GenderID: z.number({ required_error: "Please select gender" }),
    CreditCardNumber: z.string().length(10, "Phone number must be 10 characters"),
  });
  
  export type UserUpdateFormData = z.infer<typeof userUpdateFormSchema>;

  
  export const menuFormSchema = z.object({
    Name: z.string().min(1, "Name is required"), // ชื่อเมนู
    Cost: z
      .number({ required_error: "Cost is required" }) // ราคาต้องเป็นตัวเลข
      .nonnegative("Cost must be non-negative"), // ห้ามติดลบ
    Description: z.string().min(1, "Description is required"), // รายละเอียด
    Image: z.string().min(1, "Image path is required"), // รูปภาพ
    Component: z
      .array(z.string())
      .min(1, "At least one component is required"), // รายการส่วนผสม
    DiseaseID: z
      .array(z.number({ required_error: "Please select a Disease Type" }))
      .min(1, "At least one disease type must be selected"), // ต้องเลือกอย่างน้อยหนึ่ง
    MenuTypeID: z
      .number({ required_error: "Please select a Menu Type" }) // ประเภทเมนู
      .positive("Menu Type ID must be positive"), // ห้ามเป็น 0 หรือติดลบ
  });
  
  export type MenuFormData = z.infer<typeof menuFormSchema>;

  export const menuUpdateSchema = z.object({
    Name: z.string().min(1, "Name is required"), // ชื่อเมนู
    Cost: z
      .number({ required_error: "Cost is required" })
      .nonnegative("Cost must be non-negative"), // ห้ามติดลบ
    Description: z.string().min(1, "Description is required"), // รายละเอียด
    Image: z.string().optional(), // รูปภาพ (optional ในกรณีไม่เปลี่ยนรูปภาพ)
    Component: z
      .array(z.string())
      .min(1, "At least one component is required"), // รายการส่วนผสม (array ของ string)
    DiseaseTypeID: z
      .array(z.number({ required_error: "Please select at least one Disease Type" }))
      .min(1, "At least one disease type must be selected"), // โรคที่เกี่ยวข้อง (array ของ number)
    MenuTypeID: z
      .number({ required_error: "Please select a Menu Type" })
      .positive("Menu Type ID must be positive"), // ประเภทเมนู
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
    Phone: z.string().length(10, "Phone number must be 10 characters"),

    PaymentTypeID: z.number({ required_error: "Please select payment type" }),
    DeliveryTypeID: z.number({ required_error: "Please select delivery type" }),

  });
  
  export type PaymentFormData = z.infer<typeof paymentFormSchema>;
