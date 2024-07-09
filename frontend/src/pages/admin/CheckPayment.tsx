import Navbar from "./navbar"

export function CheckPayment() {
    return (
        <div>
            <Navbar />
            <div className="flex space-x-52">
                <div className="bg-slate-400 h-[800px] w-[250px]">
                    <button className="bg-slate-300 h-[80px] w-[250px]"><a href="addmenu">Add Menu</a></button>
                    <button className="bg-slate-300 h-[80px] w-[250px]"><a href="management">Managment Menu</a></button>
                    <button className="bg-slate-300 h-[80px] w-[250px]"><a href="checkpayment">Check Payment</a></button>
                </div>
            </div>
        </div>
    )
}