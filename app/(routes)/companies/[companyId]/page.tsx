import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Header } from './components/Header'

export default async function CompanyIdPage(params: {companyId: string}){
    const { userId } = await auth()

    if(!userId){
        return redirect('/')
    }

    const company = await db.company.findUnique({
        where: {
            id: params.companyId,
            userId
        }
    })

    if (!company){
        return redirect('/')
    }

    return (
        <div>
            <Header/>
        </div>
    )

}