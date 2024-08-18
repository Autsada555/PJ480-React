import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Gender, UserType } from "../../interfaces";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  GetAllGender,
  GetAllUserType,
  CreateCustomer,
} from "../../services/https/Customer";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { userFormSchema, UserFormData } from "@/validator";

const EmployeeCreateDialog = ({ onCreated }: { onCreated: () => void }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [usertype, setUserType] = useState<UserType[]>([]);
  const [gender, setGender] = useState<Gender[]>([]);

  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      FirstName: "",
      LastName: "",
      GenderID: undefined, // Default to undefined if no initial value
      UserTypeID: undefined, // Default to undefined if no initial value
      Phone: "",
      Email: "",
      UserName: "",
      Password: "",
      Address: "",
      District: "",
      Province: "",
      Postcode: "",
    },
  });

  useEffect(() => {
    async function fetchUserType() {
      try {
        const res = await GetAllUserType();
        if (res) {
          setUserType(res);
        } else {
          // Handle error if needed
          console.error("Failed to fetch user types:", res.message);
        }
      } catch (error) {
        console.error("Error fetching user types:", error);
      }
    }

    async function fetchGender() {
      try {
        const res = await GetAllGender();
        if (res) {
          setGender(res);
        } else {
          // Handle error if needed
          console.error("Failed to fetch gender options:", res.message);
        }
      } catch (error) {
        console.error("Error fetching gender options:", error);
      }
    }

    fetchGender();
    fetchUserType();
  }, []);

  const onValid: SubmitHandler<UserFormData> = async (formData) => {
    const res = await CreateCustomer("/customer/create", formData);

    if (res.status) {
      // Use 'status' instead of 'ok'
      toast({
        title: res.message, // Use 'message' instead of 'data'
        duration: 1500,
        variant: "default", // Use a valid variant value
      });
      onCreated();
      setOpen(false);
    } else {
      toast({
        title: "Creation Failed",
        description: res.message, // Use 'message' for error feedback
        duration: 1500,
        variant: "destructive", // Use 'destructive' for error toasts
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <UserPlus className="text-green-500  mt-[30px] ml-[60px] hover:scale-110 cursor-pointer" />
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[480px] h-[80%] overflow-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Create Employee Data</AlertDialogTitle>
          <AlertDialogDescription>
            Make changes to your Employee here. Click save when you're done.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={form.handleSubmit(onValid)}>
          <Form {...form}>
            <div className="grid gap-2 mt-4">
              <FormField
                name="FirstName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="LastName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

<FormField
  name="GenderID"
  control={form.control}
  render={({ field }) => (
    <FormItem>
      <FormLabel>Gender</FormLabel>
      <FormControl>
        <Select
          value={field.value !== undefined ? String(field.value) : ""} // Convert number to string
          onValueChange={(value) => field.onChange(Number(value))} // Convert string to number
        >
          <SelectTrigger>
            <SelectValue placeholder="Pick Gender" />
          </SelectTrigger>
          <SelectContent>
            {gender.map((g) => (
              <SelectItem key={g.ID} value={String(g.ID)}>
                {g.Name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
<FormField
  name="UserTypeID"
  control={form.control}
  render={({ field }) => (
    <FormItem>
      <FormLabel>User Type</FormLabel>
      <FormControl>
        <Select
          value={field.value !== undefined ? String(field.value) : ""} // Convert number to string
          onValueChange={(value) => field.onChange(Number(value))} // Convert string to number
        >
          <SelectTrigger>
            <SelectValue placeholder="Pick User Type" />
          </SelectTrigger>
          <SelectContent>
            {usertype.map((u) => (
              <SelectItem key={u.ID} value={String(u.ID)}>
                {u.Name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


              <FormField
                name="Phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="UserName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UserName</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="Email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="Password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="Address"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="District"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="Province"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Province</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="Postcode"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postcode</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <AlertDialogFooter>
              <AlertDialogAction asChild>
                <Button variant="secondary">Close</Button>
              </AlertDialogAction>
              <Button type="submit">Save changes</Button>
            </AlertDialogFooter>
          </Form>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default EmployeeCreateDialog;
