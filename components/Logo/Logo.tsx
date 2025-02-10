"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export function Logo() {
    const router = useRouter();
    
    return (
        <div className="min-h-20 flex items-center px-6 border-r cursor-pointer gap-x-2"
        onClick={() => router.push("/")}
        >
            <Image src="/logoipsum-269.svg" alt="logo" width={30} height={30} priority/>
            <h1 className="text-xl">My Dashboard</h1>
        </div>
    )
}