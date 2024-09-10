// import { useEffect, useState } from "react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { toast } from "react-toastify";
// import { PaymentType, DeliveryType } from "../../interfaces";

// import {
//   GetAddressByUserId,
//   GetDeliveryType,
//   GetPaymentType,
//   CreatePayment,
// } from "../../services/https/Payment";
// import { useForm, SubmitHandler, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { paymentFormSchema, PaymentFormData } from "@/validator";

// const Payment = ({
//   userID,
//   onCreated,
// }: {
//   userID: number;
//   onCreated: () => void;
// }) => {
//   const [paymentType, setPaymentType] = useState<PaymentType[]>([]);
//   const [deliveryType, setDeliveryType] = useState<DeliveryType[]>([]);

//   const form = useForm<PaymentFormData>({
//     resolver: zodResolver(paymentFormSchema),
//     defaultValues: {
//       PaymentTypeID: undefined,
//       DeliveryTypeID: undefined,
//       Address: "",
//       District: "",
//       Province: "",
//       Postcode: "",
//     },
//   });

//   // Fetch Payment and Delivery Types
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const paymentRes = await GetPaymentType();
//         const deliveryRes = await GetDeliveryType();
//         if (Array.isArray(paymentRes)) {
//           setPaymentType(paymentRes);
//         }
//         if (Array.isArray(deliveryRes)) {
//           setDeliveryType(deliveryRes);
//         }
//       } catch (error) {
//         console.error("Error fetching types:", error);
//       }
//     }
//     fetchData();
//   }, []);

//   // Fetch Address by UserID when a delivery type is selected
//   const handleDeliveryTypeChange = async (deliveryTypeID: number) => {
//     form.setValue("DeliveryTypeID", deliveryTypeID);
//     try {
//       const addressRes = await GetAddressByUserId(userID); // API call to fetch address by user ID
//       if (addressRes) {
//         form.setValue("Address", addressRes.address);
//         form.setValue("District", addressRes.district);
//         form.setValue("Province", addressRes.province);
//         form.setValue("Postcode", addressRes.postcode);
//       }
//     } catch (error) {
//       console.error("Error fetching address:", error);
//     }
//   };

//   const onValid: SubmitHandler<PaymentFormData> = async (
//     formData: PaymentFormData
//   ) => {
//     try {
//       const res = await CreatePayment(formData);
//       if (res.status) {
//         toast.success("Payment created successfully", {
//           position: "bottom-right",
//           autoClose: 1500,
//         });
//         onCreated();
//       } else {
//         toast.error(`Creation Failed: ${res.message}`, {
//           position: "bottom-right",
//           autoClose: 1500,
//         });
//       }
//     } catch (error) {
//       toast.error("An error occurred while creating the payment.", {
//         autoClose: 1500,
//       });
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={form.handleSubmit(onValid)}>
//         <div className="space-y-4">
//           {/* Delivery Type */}
//           <div>
//             <Label htmlFor="delivery-type">Delivery Type</Label>
//             {Array.isArray(deliveryType) && deliveryType.map((type) => (
//               <div key={type.ID}>
//                 <Controller
//                   control={form.control}
//                   name="DeliveryTypeID"
//                   render={({ field }) => (
//                     <Checkbox
//                       checked={field.value === type.ID}
//                       onChange={() => handleDeliveryTypeChange(type.ID)}
//                     />
//                   )}
//                 />
//                 <label>{type.Name}</label>
//               </div>
//             ))}
//           </div>

//           {/* Payment Type */}
//           <div>
//             <Label htmlFor="payment-type">Payment Type</Label>
//             {Array.isArray(paymentType) && paymentType.map((type) => (
//               <div key={type.ID}>
//                 <Controller
//                   control={form.control}
//                   name="PaymentTypeID"
//                   render={({ field }) => (
//                     <Checkbox
//                       checked={field.value === type.ID}
//                       onChange={() => field.onChange(type.ID)}
//                     />
//                   )}
//                 />
//                 <label>{type.Name}</label>
//               </div>
//             ))}
//           </div>

//           {/* Address */}
//           <div>
//             <Label htmlFor="address">Address</Label>
//             <Input {...form.register("Address")} />
//           </div>

//           {/* District */}
//           <div>
//             <Label htmlFor="district">District</Label>
//             <Input {...form.register("District")} />
//           </div>

//           {/* Province */}
//           <div>
//             <Label htmlFor="province">Province</Label>
//             <Input {...form.register("Province")} />
//           </div>

//           {/* Postcode */}
//           <div>
//             <Label htmlFor="postcode">Postcode</Label>
//             <Input {...form.register("Postcode")} />
//           </div>

//           {/* Submit Button */}
//           <Button type="submit">Confirm Transaction</Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Payment;
