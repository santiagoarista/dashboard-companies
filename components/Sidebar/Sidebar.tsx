import { SidebarRoutes } from "../SidebarRoutes/SidebarRoutes";
import { Logo } from "../Logo/Logo";

export function Sidebar() {
    return (
        <div className="h-screen">
            <div className="flex flex-col h-full border-r">
                <Logo />
                <SidebarRoutes />
            </div>
        </div>
    )
}