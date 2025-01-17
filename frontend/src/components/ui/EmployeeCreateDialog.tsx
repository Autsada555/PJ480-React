import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Gender, UserType } from "../../interfaces";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

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
  const [open, setOpen] = useState(false);
  const [usertype, setUserType] = useState<UserType[]>([]);
  const [gender, setGender] = useState<Gender[]>([]);

  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      FirstName: "",
      LastName: "",
      GenderID: undefined,
      UserTypeID: undefined,
      Phone: "",
      Email: "",
      UserName: "",
      Password: "",
      Address: "",
      CreditCardNumber: "",
      // District: "",
      // Province: "",
      // Postcode: "",
    },
  });

  useEffect(() => {
    async function fetchUserType() {
      try {
        const res = await GetAllUserType();
        if (res) {
          setUserType(res);
        } else {
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
          console.error("Failed to fetch gender options:", res.message);
        }
      } catch (error) {
        console.error("Error fetching gender options:", error);
      }
    }

    fetchGender();
    fetchUserType();
  }, []);

  const onValid: SubmitHandler<UserFormData> = async (formData: UserFormData) => {
    try {
      const res = await CreateCustomer(formData);
      if (res.status) {
        toast.success("Customer created successfully", {
          position: "bottom-right",
          autoClose: 1500,
        });
        onCreated();
        setOpen(false); // Close the pop-up after successful creation
      } else {
        toast.error(`Creation Failed: ${res.message}`, {
          position: "bottom-right",
          autoClose: 1500,
        });
      }
    } catch (error) {
      toast.error("An error occurred while creating the customer.", {
        autoClose: 1500,
      });
    }
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <UserPlus className="text-green-500 mt-[40px] ml-[-85px] hover:scale-130 cursor-pointer w-10 h-10" />
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-[480px] h-[80%] overflow-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">สร้างบัญชีผู้ใช้</AlertDialogTitle>
            <AlertDialogDescription>
              ทำการสร้างบัญชีของผู้ใช้งานและทำการกดบันทึกข้อมูลที่นี่
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={form.handleSubmit(onValid)}>
            <Form {...form}>
              <div className="grid gap-2 mt-1">
                <FormField
                  name="FirstName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ชื่อ</FormLabel>
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
                      <FormLabel>นามสกุล</FormLabel>
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
                      <FormLabel>เพศ</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value !== undefined ? String(field.value) : ""}
                          onValueChange={(value) => field.onChange(Number(value))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกเพศ" />
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
                      <FormLabel>ประเภทผู้ใช้งาน</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value !== undefined ? String(field.value) : ""}
                          onValueChange={(value) => field.onChange(Number(value))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกประเภทผู้ใช้งาน" />
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
                      <FormLabel>เบอร์โทรศัพท์</FormLabel>
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
                      <FormLabel>ชื่อผู้ใช้งาน</FormLabel>
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
                      <FormLabel>อีเมล</FormLabel>
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
                      <FormLabel>รหัสผ่าน</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="CreditCardNumber"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>เลขบัญชี</FormLabel>
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
                      <FormLabel>ที่อยู่</FormLabel>
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
                  <Button variant="secondary" className="bg-gray-600 mt-4" onClick={() => setOpen(false)}>
                    ปิด
                  </Button>
                </AlertDialogAction>
                <Button type="submit" className="bg-green-600 mt-4" onClick={() => setOpen(false)}>สร้างบัญชี</Button>
              </AlertDialogFooter>
            </Form>
          </form>
        </AlertDialogContent>
      </AlertDialog>
      <ToastContainer />
    </>
  );
};

export default EmployeeCreateDialog;
