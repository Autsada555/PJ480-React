import { Button } from "@/components/ui/button";
import Navbar from "./navbar";

export function Home() {
    return (
        <div>
            <Navbar/>
            <Button><a href="addmenu">Addmenu</a></Button>
            <Button><a href="management">management</a></Button>
            <Button><a href="checkpayment">checkpayment</a></Button>
            <Button><a href="customer">customer</a></Button>
        </div>
    )
}
