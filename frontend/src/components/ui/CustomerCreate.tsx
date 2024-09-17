import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { userFormSchema, UserFormData } from "@/validator";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Gender, } from "../../interfaces";
import { useEffect, useState } from "react";
import {
    GetAllGender,
    CreateCustomer,
} from "../../services/https/Customer";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function CustomerCreate() {
    const [gender, setGender] = useState<Gender[]>([]);

    const onSubmit: SubmitHandler<UserFormData> = async (formData: UserFormData) => {
        console.log("Form submitted:", formData); 
        try {
            formData.UserTypeID = 100;
            const res = await CreateCustomer(formData);
            console.log("Customer creation response:", res);  

            if (res.status) {
                toast.success("Customer created successfully", {
                    position: "bottom-right",
                    autoClose: 1500,
                });
            } else {
                toast.error(`Creation Failed: ${res.message}`, {
                    position: "bottom-right",
                    autoClose: 1500,
                });
            }
        } catch (error) {
            console.error("Error during customer creation:", error);
            toast.error("An error occurred while creating the customer.", {
                autoClose: 1500,
            });
        }
    };


    useEffect(() => {
        async function fetchGender() {
            try {
                const res = await GetAllGender();
                console.log("Gender data:", res);
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
    }, []);


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
            District: "",
            Province: "",
            Postcode: "",
        },
    });

    return (
        <div className="flex justify-center mt-12">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6 max-w-4xl">
                    <div className="col-span-2 text-2xl font-bold mb-4">Sign Up</div>

                    <FormField
                        name="UserName"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username<span className="text-red-500">*</span></FormLabel>
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
                                <FormLabel>Email<span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input {...field} />
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
                                <FormLabel>Password<span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input {...field} type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="FirstName"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name<span className="text-red-500">*</span></FormLabel>
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
                                <FormLabel>Last Name<span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input {...field} />
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
                                <FormLabel>Phone<span className="text-red-500">*</span></FormLabel>
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
                                <FormLabel>Gender<span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Select
                                        value={field.value !== undefined ? String(field.value) : ""}
                                        onValueChange={(value) => field.onChange(Number(value))}
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
                        name="Address"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address<span className="text-red-500">*</span></FormLabel>
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
                                <FormLabel>Province<span className="text-red-500">*</span></FormLabel>
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
                                <FormLabel>District<span className="text-red-500">*</span></FormLabel>
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
                                <FormLabel>Postcode<span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="col-span-2 mt-4 bg-green-600 text-white">
                        Submit
                    </Button>
                </form>
            </Form>
            <ToastContainer />
        </div>
    );
}

