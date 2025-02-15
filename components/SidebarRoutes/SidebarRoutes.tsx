"use client";

import { dataGeneralSidebar, dataToolsSidebar, dataSupportSidebar } from "./SidebarRoutes.data";
import { SidebarItem } from "../SidebarItem";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function SidebarRoutes() {
    return (
        <div className="flex flex-col h-full"> {/* Removed justify-between and added flex-grow */}
            <div className="flex-1 overflow-y-auto"> {/* Make content area scrollable */}
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

            <div className="p-6 mt-4"> {/* Footer section */}
                <div className="text-center">
                    <Button variant="outline" className="w-full bg-black text-white">
                        Upgrade Plan
                    </Button>
                </div>
                <Separator />
                <footer className="mt-3 text-center xl:text-sm ">
                    2025. All rights reserved. ©
                </footer>
            </div>
        </div>
    );
}