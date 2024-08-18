import { Button } from "@/components/ui/button";
import { Gender, UserType, User } from "../../interfaces";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Edit } from "lucide-react";
import { GetAllGender, GetAllUserType, UpdateCustomer } from "../../services/https/Customer";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

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

import {
  userUpdateFormSchema,
  UserUpdateFormData,
} from "@/validator";

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

interface Props {
  customers: User;
  onSave(): void;
}

const EmployeeEdit = ({ customers, onSave }: Props) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [usertype, setUserType] = useState<UserType[]>([]);
  const [gender, setGender] = useState<Gender[]>([]);

  const form = useForm<UserUpdateFormData>({
    resolver: zodResolver(userUpdateFormSchema),
    defaultValues: {
      FirstName: customers.FirstName,
      LastName: customers.LastName,
      GenderID: customers.Gender.ID,
      UserTypeID: customers.UserTypeID,
      Phone: customers.Phone,
      Email: customers.Email,
      Address: customers.Address,
      District: customers.District,
      Province: customers.Province,
      Postcode: customers.Postcode
    },
  });

  useEffect(() => {
    async function fetchUserType() {
      const res = await GetAllUserType();
      if (res.ok) {
        setUserType(res.data);
      }
    }

    async function fetchGender() {
      const res = await GetAllGender();
      if (res.ok) {
        setGender(res.data);
      }
    }
    fetchGender();
    fetchUserType();
  }, []);

  const onValid: SubmitHandler<UserUpdateFormData> = async (formData) => {
    try {
      const data = {}; // Create an appropriate data object if needed
  
      const res = await UpdateCustomer("/customer/edit", customers.ID, formData, data);
  
      if (res.status) {
        onSave();
        toast({
          title: "Update Successful",
          description: res.message,
          duration: 1500,
        });
      } else {
        toast({
          title: "Update Failed",
          description: "An error occurred while updating.",
          duration: 1500,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong.",
        duration: 1500,
      });
    }
  };
  
  

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Edit className="text-yellow-500 abs-center hover:scale-110 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[480px] h-[80%] overflow-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Employee Data</AlertDialogTitle>
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

              {gender.length > 0 && (
                <FormField
                  name="GenderID"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={String(customers.Gender.ID)}>
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
              )}

              {usertype.length > 0 && (
                <FormField
                  name="UserTypeID"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UserType</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={String(customers.UserTypeID)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pick UserType" />
                          </SelectTrigger>
                          <SelectContent>
                            {usertype.map((g) => (
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
              )}


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

export default EmployeeEdit;
