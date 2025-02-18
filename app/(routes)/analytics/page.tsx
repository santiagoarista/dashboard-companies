import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { CompaniesChart } from "./components/CompaniesChart"



export default async function PageAnalytics(){
    const {userId} = await auth()

    if(!userId){
        return redirect('/')
    }

    const companies = await db.company.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const events = await db.event.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
    return (
        <div className="rounded-lg shadow-md bg-background">
            <h2 className="text-2xl mb-4 p-6">Company & Event Analytics</h2>
            <div>
                <CompaniesChart companies={companies} events={events}/>
            </div>
        </div>
    )
}