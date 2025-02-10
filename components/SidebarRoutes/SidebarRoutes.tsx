"use client";

import { dataGeneralSidebar, dataToolsSidebar, dataSupportSidebar } from "./SidebarRoutes.data";
import { SidebarItem } from "../SidebarItem";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function SidebarRoutes() {

    return (
        <div className="flex flex-col justify-between h-full">
            <div>
                <div className="p-2 md:p-6">
                    <p className="text-slate-500 mb-2">General</p>
                    {dataGeneralSidebar.map((item) => (
                        <SidebarItem key={item.label} item={item} />
                    ))}
                </div>

                <Separator />

                <div className="p-2 md:p-6">
                    <p className="text-slate-500 mb-2">Tools</p>
                    {dataToolsSidebar.map((item) => (
                        <SidebarItem key={item.label} item={item} />
                    ))}
                </div>

                <Separator />

                <div className="p-2 md:p-6">
                    <p className="text-slate-500 mb-2">Support</p>
                    {dataSupportSidebar.map((item) => (
                        <SidebarItem key={item.label} item={item} />
                    ))}
                </div>
            </div>

            <div>
                <div className="text-center p-6">
                    <Button variant="outline" className="w-full bg-black text-white">
                        Upgrade Plan
                    </Button>
                </div>
                <Separator />
                <footer className="mt-3 p-3 text-center xl:p-0 xl:text-sm ">
                    2025. All rights reserved. ©
                </footer>
            </div>
        </div>
    )
}