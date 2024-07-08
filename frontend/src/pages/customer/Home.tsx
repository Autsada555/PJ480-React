import { Button } from "@/components/ui/button";
import Navbar from "./navbar";

export function Home() {
    return (
        <div>
            <Navbar/>
            <Button><a href="addmenu">Addmenu</a></Button>
        </div>
    )
}
