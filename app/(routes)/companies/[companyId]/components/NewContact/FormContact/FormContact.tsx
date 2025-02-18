'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from '@/components/ui/input'

import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { FormContactProps } from "./FormContact.types"
import { formSchema } from "./FormContact.form"
import { number, z } from "zod"
import { toast } from "@/hooks/use-toast"

export function FormContact(props: FormContactProps){
    const { setOpen } = props

    const params = useParams<{companyId: string}>()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            role: '',
            email: '',
            phone: '',
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            axios.post(`/api/company/${params.companyId}/contact`, values)
            toast({
                title: 'Contact created!'
            })
            router.refresh()
            router.push(`/companies/${params.companyId}`)
            setOpen(false)
        }catch(error){
            toast({
                title: 'Something went wrong',
                variant: 'destructive'
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 pt-4 relative">
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Contact's name..." type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='role'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                                <Input placeholder="Contact's role..." type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Contact's email..." type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input placeholder="Contact's phone..." type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="self-start w-32 mt-5">Submit</Button>
            </form>
        </Form>
    )
}