import { Label } from "@radix-ui/react-label"
import Navbar from "./navbar"
// import { Footer } from "./footer"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
export function AddMenu() {
    // const uploadInput = document.getElementById('upload');
    // const filenameLabel = document.getElementById('filename');
    // const imagePreview = document.getElementById('image-preview');

    // let isEventListenerAdded = false;

    // uploadInput.addEventListener('change', (event) => {
    //     const file = event.target.files[0];

    //     if (file) {
    //         filenameLabel.textContent = file.name;

    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             imagePreview.innerHTML =
    //                 `<img src="${e.target.result}" class="max-h-48 rounded-lg mx-auto" alt="Image preview" />`;
    //             imagePreview.classList.remove('border-dashed', 'border-2', 'border-gray-400');

    //             // Add event listener for image preview only once
    //             if (!isEventListenerAdded) {
    //                 imagePreview.addEventListener('click', () => {
    //                     uploadInput.click();
    //                 });

    //                 isEventListenerAdded = true;
    //             }
    //         };
    //         reader.readAsDataURL(file);
    //     } else {
    //         filenameLabel.textContent = '';
    //         imagePreview.innerHTML =
    //             `<div class="bg-gray-200 h-48 rounded-lg flex items-center justify-center text-gray-500">No image preview</div>`;
    //         imagePreview.classList.add('border-dashed', 'border-2', 'border-gray-400');

    //         // Remove the event listener when there's no image
    //         imagePreview.removeEventListener('click', () => {
    //             uploadInput.click();
    //         });

    //         isEventListenerAdded = false;
    //     }
    // });

    // uploadInput.addEventListener('click', (event) => {
    //     event.stopPropagation();
    // });
    return (
        <div>
            <Navbar />
            <div className="flex space-x-[260px]">
                <div className="bg-slate-400 h-[800px] w-[250px]">
                    <button className="bg-slate-300 h-[80px] w-[250px]"><a href="addmenu">Add Menu</a></button>
                    <button className="bg-slate-300 h-[80px] w-[250px]"><a href="management">Managment Menu</a></button>
                    <button className="bg-slate-300 h-[80px] w-[250px]"><a href="checkpayment">Check Payment</a></button>
                    <button className="bg-slate-300 h-[80px] w-[250px]"><a href="listuser">List User</a></button>
                </div>

                <div className="mt-6">
                    <Card className="w-[800px]">
                        <CardHeader>
                            <CardTitle>Add Menu</CardTitle>
                            <CardDescription>
                                Add your ingredents detail for your food
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className=" ">
                                <Label
                                    htmlFor="name"
                                    className="left-[27px] ]"
                                >
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="name"
                                    //   value={formData.lastName}
                                    //   onChange={handleChange}
                                    className="text-[16px] "
                                />
                            </div>
                            <div className="">
                                <Label
                                    htmlFor="Cost"
                                    className="left-[27px]  "
                                >
                                    Cost
                                </Label>
                                <Input
                                    id="cost"
                                    placeholder="cost"
                                    //   value={formData.lastName}
                                    //   onChange={handleChange}
                                    className="text-[16px] "
                                />
                            </div>
                            <div className="">
                                <Label
                                    htmlFor="description"
                                    className="left-[27px]  "
                                >
                                    Description
                                </Label>
                                <Input
                                    id="description"
                                    placeholder="description"
                                    //   value={formData.gender}
                                    //   onChange={handleChange}
                                    className="text-[16px] "
                                />

                            </div>
                            <div className="">
                                <Label
                                    htmlFor="component"
                                    className="left-[27px]  "
                                >
                                    Component
                                </Label>
                                <Input
                                    id="component"
                                    placeholder="component"
                                    //   value={formData.gender}
                                    //   onChange={handleChange}
                                    className="text-[16px] "
                                />

                            </div>

                            <div className="flex flex-warp items-center space-x-2 justify-center">
                                <div className="flex items-center space-x-2 left-[270px] top-[165px] mt-2">
                                    <Checkbox id="terms" />
                                    <label
                                        htmlFor="terms"
                                        className="text-[17px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-['Inter']"
                                    >
                                        Diabetes
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2 left-[270px] top-[165px] mt-2">
                                    <Checkbox id="terms" />
                                    <label
                                        htmlFor="terms"
                                        className="text-[17px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-['Inter']"
                                    >
                                        Heart Disease
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2 left-[270px] top-[165px] mt-2">
                                    <Checkbox id="terms" />
                                    <label
                                        htmlFor="terms"
                                        className="text-[17px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-['Inter']"
                                    >
                                        Anemia
                                    </label>
                                </div>
                            </div>
                            <div>
                                <section className="container w-full mx-auto items-center">
                                    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden items-center">
                                        <div className="px-4 py-4">
                                            <div id="image-preview" className="max-w-xs p-4 mb-2 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer">
                                                <input id="upload" type="file" className="hidden" accept="image/*" />
                                                <label htmlFor="upload" className="cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-gray-700 mx-auto mb-2">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                                    </svg>
                                                    <h5 className="mb-1 text-lg font-bold tracking-tight text-gray-700">Upload food picture</h5>
                                                    <p className="font-normal text-xs text-gray-400">Choose photo size should be less than <b className="text-gray-600">2mb</b></p>
                                                    <p className="font-normal text-xs text-gray-400">and should be in <b className="text-gray-600">JPG, PNG, or GIF</b> format.</p>
                                                    <span id="filename" className="text-gray-500 bg-gray-200 z-50"></span>
                                                </label>
                                            </div>
                                            <div className="flex items-center justify-center">
                                                <div className="w-full">
                                                    <label className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-4 py-2 flex items-center justify-center cursor-pointer">
                                                        <span className="text-center ml-2">Upload</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                            </div>
                        </CardContent>
                        <CardFooter className="justify-center">
                            <Button type="submit" className="bg-green-600">Confirm</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}