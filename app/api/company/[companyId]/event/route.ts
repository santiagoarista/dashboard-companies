import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request, {params}: {params: {companyId: string}}){
    try{
        const {userId} = await auth()
        const data = await req.json()
        const { companyId } = await params

        if(!userId){
            return new NextResponse('Unauthorized', {status: 401})
        }

        const company = await db.company.findUnique({
            where: {
                id: companyId
            }
        })

        if(!company){
            return new NextResponse('Company not found', {status: 404})
        }

        const event = await db.event.create({
            data: {
                companyId: companyId,
                ...data
            }
        })

        return NextResponse.json(event);

    }catch(error){
        console.log('[EVENT]', error)
        return new NextResponse('Internal error', {status: 500})
    }
} 