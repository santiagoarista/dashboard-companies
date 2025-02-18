'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form'
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import { Input } from "@/components/ui/input"
import { Toast } from "@/components/ui/toast"

import { UploadButton } from "@uploadthing/react"

import { CompanyFormnProps } from "./CompanyForm.types"
import { formSchema } from "./CompanyForm.form"
import { toast } from "@/hooks/use-toast"
import { OurFileRouter } from "@/app/api/uploadthing/core"



export function CompanyForm(props: CompanyFormnProps){
    const { company } = props
    const router = useRouter()
    const [photoUploaded, setPhotoUploaded] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: company.name,
            description: company.description,
            country: company.country,
            website: company.website,
            phone: company.phone,
            cif: company.cif,
            profileImage: company.profileImage
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/company/${company.id}`, values);
            toast({
                title: 'Company updated!',
            });

            router.refresh(); // Ensure the new data is loaded
            router.push('/companies'); // Now navigate to the new page

        } catch (error) {
            toast({
                title: 'Something went wrong.',
                variant: 'destructive',
            });
        }
    };

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-2 gap-3">
                    <FormField 
                        control={form.control} 
                        name="name" 
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Company's name..." type="text" {...field}/>
                            </FormControl>
                        </FormItem>
                    )}
                    />
                    <FormField 
                        control={form.control} 
                        name="country" 
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select country'/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="brazil">Brasil</SelectItem>
                                    <SelectItem value="china">China</SelectItem>
                                    <SelectItem value="colombia">Colombia</SelectItem>
                                    <SelectItem value="south-korea">Corea del Sur</SelectItem>
                                    <SelectItem value="dr-congo">República Democrática del Congo</SelectItem>
                                    <SelectItem value="egypt">Egipto</SelectItem>
                                    <SelectItem value="spain">España</SelectItem>
                                    <SelectItem value="ethiopia">Etiopía</SelectItem>
                                    <SelectItem value="france">Francia</SelectItem>
                                    <SelectItem value="germany">Alemania</SelectItem>
                                    <SelectItem value="india">India</SelectItem>
                                    <SelectItem value="indonesia">Indonesia</SelectItem>
                                    <SelectItem value="iran">Irán</SelectItem>
                                    <SelectItem value="italy">Italia</SelectItem>
                                    <SelectItem value="japan">Japón</SelectItem>
                                    <SelectItem value="kenya">Kenia</SelectItem>
                                    <SelectItem value="mexico">México</SelectItem>
                                    <SelectItem value="myanmar">Myanmar</SelectItem>
                                    <SelectItem value="philippines">Filipinas</SelectItem>
                                    <SelectItem value="russia">Rusia</SelectItem>
                                    <SelectItem value="south-africa">Sudáfrica</SelectItem>
                                    <SelectItem value="thailand">Tailandia</SelectItem>
                                    <SelectItem value="turkey">Turquía</SelectItem>
                                    <SelectItem value="united-kingdom">Reino Unido</SelectItem>
                                    <SelectItem value="united-states">Estados Unidos</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <FormField 
                        control={form.control} 
                        name="website" 
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Website</FormLabel>
                            <FormControl>
                                <Input placeholder="Company's website..." type="text" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <FormField 
                        control={form.control} 
                        name="phone" 
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input placeholder="Company's phone..." type="number" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <FormField 
                        control={form.control} 
                        name="cif" 
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>CIF</FormLabel>
                            <FormControl>
                                <Input placeholder="Company's cif..." type="text" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <FormField 
                        control={form.control} 
                        name="profileImage" 
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Profile Image</FormLabel>
                            <FormControl>
                                <div>
                                    {photoUploaded? (
                                        <p className="text-sm">Image already uploaded</p>
                                    ): (
                                        <UploadButton<OurFileRouter, 'profileImage'>
                                                className='bg-slate-600/20 text-slate-800 rounded-lg outline-dotted outline-3' {...field}
                                                endpoint="profileImage"
                                                onClientUploadComplete={(res: { ufsUrl: string }[]) => {
                                                    form.setValue("profileImage", res[0].ufsUrl, { shouldValidate: true, shouldDirty: true });
                                                    form.trigger("profileImage");
                                                    toast({
                                                        title: 'Image Uploaded!'
                                                    })
                                                    setPhotoUploaded(true)
                                                }}
                                                onUploadError={(error: Error) => {
                                                    toast({
                                                        title: 'Error uploading photo'
                                                    })
                                                }}
                                        />
                                    )}
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <FormField 
                        control={form.control} 
                        name="description" 
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company's Description</FormLabel>
                            <FormControl>
                                <Textarea 
                                    placeholder="Description..." {...field}
                                    value={form.getValues().description ?? ''} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                </div>
                <Button type="submit">Edit Company</Button>
            </form>
        </Form>
    )
}