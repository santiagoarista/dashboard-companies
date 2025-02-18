import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function  POST(req: Request, {params}: {params: {companyId: string}}){
    try{
        const {userId} = await auth()
        const {companyId} = await params
        const data = await req.json()

        if(!userId){
            return new NextResponse('Unauthorized', {status: 401})
        }

        const company = await db.company.findUnique({
            where: {
                id: companyId,
                userId,
            },
        })

        if (!company){
            return new NextResponse("Company not found", {status: 404})
        }

        const contact = await db.contact.create({
            data: {
                companyId: companyId,
                ...data,
            },
        })

        return NextResponse.json(contact)

    }catch(error){
        console.log('[CONTACT]', error)
        return new NextResponse('Internal Error', {status: 500})
    }

}