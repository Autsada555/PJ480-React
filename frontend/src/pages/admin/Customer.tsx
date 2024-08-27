import { useEffect, useState } from "react";
import CustomerUpdate from "@/components/ui/CustomerUpdate";
import Navbar from "./navbar";
import { GetCustomer } from "@/services/https/Customer"; // Adjust the import path as needed
import { User } from "@/interfaces";

export function Customer() {
  const [customer, setCustomer] = useState<User | null>(null);
  const customerID = 1; // Replace this with the actual customerID from the logged-in user

  useEffect(() => {
    async function fetchCustomer() {
      try {
        const res = await GetCustomer(customerID); // Use customerID to fetch data
        if (res.ok) {
          setCustomer(res.data);
        } else {
          console.error("Failed to load customer data:", res.message);
        }
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    }

    fetchCustomer();
  }, [customerID]); // Add customerID to the dependency array if it can change

  
  const handleSave = () => {
    // Reload customer data or display a success message
    console.log("Customer data has been saved.");
  };

  return (
    <>
      <Navbar />
      {customer ? (
        <CustomerUpdate customers={customer} onSave={handleSave} />
      ) : (
        <p>Loading customer data...</p>
      )}
    </>
  );
}

export default Customer;
