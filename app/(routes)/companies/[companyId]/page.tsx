import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Header } from './components/Header'
import { CompanyInformation } from './components/CompanyInformation'

export async function generateStaticParams() {
    return []; // 👈 Required to avoid hydration issues
}

export default async function CompanyIdPage({ params }: { params: { companyId: string } }) {
    const { userId } = await auth();

    const { companyId } = await params;

    if (!userId) {
        return redirect('/');
    }

    // ✅ Explicitly await params
    // const companyId = await Promise.resolve(params.companyId);

    if (!companyId) {
        return redirect('/');
    }

    const company = await db.company.findUnique({
        where: {
            id: companyId,
            userId,
        },
    });

    if (!company) {
        return redirect('/');
    }

    // console.log("COMPANY")
    // console.log(company)

    return (
        <div>
            <Header />
            <CompanyInformation company={company}/>
        </div>
    );
}