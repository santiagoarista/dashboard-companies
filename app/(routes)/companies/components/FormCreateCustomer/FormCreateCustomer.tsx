"use client"
 
import { set, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormCreateCustomerProps } from "./FormCreateCustomer.types"
import { useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { UploadButton } from "@/utils/uploadthing"
import { toast } from "@/hooks/use-toast"
import axios from 'axios'
import { useRouter } from "next/navigation"



 
const formSchema = z.object({
  name: z.string().min(2).max(50),
  country: z.string().min(2).max(50),
  website: z.string().min(2),
  phone: z.string().min(2),
  cif: z.string().min(6),
  profileImage: z.string()
})

export function FormCreateCustomer(props: FormCreateCustomerProps){

    const { setOpenModalCreate } = props
    const router = useRouter()
    const [photoUploaded, setPhotoUploaded] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            country: '',
            website: '',
            phone: '',
            cif: '',
            profileImage: ''
        },
      })

    const { isValid } = form.formState
     
      // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            axios.post('/api/company', values)
            toast({title: 'Company Created'})
            router.refresh()
            setOpenModalCreate(false)
        }catch (error){
            toast({
                title: 'Something went wrong',
                variant: 'destructive'
            })
        }
    }
    
    return(
        <div className="overflow-visible relative">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-2 gap-3 relative overflow-visible">
                        {/*Name Field*/}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Please enter the company's name..." type='text' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Country Field */}
                        <div className="relative overflow-visible">
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose a country" />
                                            </SelectTrigger>
                                            <SelectContent 
                                                position="popper"
                                                side="bottom"
                                                align="start"
                                                className="z-[1000] bg-white shadow-lg max-h-[300px] overflow-auto"
                                            >
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/*Website Field*/}
                        <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Please enter the company's website..." type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
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
                                        <Input placeholder="Please enter the company's phone..." type='number' {...field} />
                                    </FormControl>
                                    <FormMessage />
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
                                        <Input placeholder="Please enter the company's CIF..." type='text' {...field} />
                                    </FormControl>
                                    <FormMessage />
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
                                        {photoUploaded? (
                                            <p className="text-sm">Image Uploaded!</p>
                                        ): (
                                            <UploadButton
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
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" disabled={!isValid}>Submit</Button>
                </form>
            </Form>
        </div>
    )
}