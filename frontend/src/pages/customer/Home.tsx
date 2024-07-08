import { Button } from "@/components/ui/button";
import Navbar from "./navbar";


export function Home() {
    // const products = dataReward.flatMap((reward) => [
    //     {
    //       id: reward.ID,
    //       name: reward.Descript,
    //       price: reward.CoinAmount,
    //       imageSrc: reward.RewardImage,
    //       quantity: reward.Quantity,
    //     }
    //   ]);

    return (
        <div>
            <Navbar />
            <Button><a href="addmenu">Addmenu</a></Button>
            <Button><a href="management">management</a></Button>
            <Button><a href="checkpayment">checkpayment</a></Button>
            <Button><a href="customer">customer</a></Button>

            <div className=" border rounded-[20px] h-[250px] w-[230px] ">
                <img className="h-[125px] w-[230px] cursor-pointer rounded-[20px]" src="src\assets\kawkookkapi.webp" alt="image" />
                <div className=" flex flex-row space-x-[100px] pl-2 mt-[20px]">
                    <h1>ข้าวคลุกกะปิ</h1>
                    <h1>70 ฿</h1>
                </div>
                <h2 className="flex pl-2">Fast foods</h2>
                <div className="flex pt-3 space-x-[115px] ">
                    <div className="flex">
                        <img className="h-[20px] pl-2 cursor-pointer" src="src\assets\star.svg" alt="star" />
                        <h1 className="pl-2">4.0</h1>
                    </div>
                    <img className="h-[30px] cursor-pointer" src="src\assets\add.svg" alt="add" />
                </div>


            </div>
        </div>
    )
}
