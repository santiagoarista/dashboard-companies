"use client"
 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
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
        console.log(values)
    }
    
    return(
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-2 gap-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Company name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Please enter the company's name..." {...field} />
                                    </FormControl>
                                <FormMessage />
                                </FormItem>
                        )}
                        />
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Select 
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Choose a country'/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value='spain'>España</SelectItem>
                                                <SelectItem value='france'>Francia</SelectItem>
                                                <SelectItem value='mexico'>México</SelectItem>
                                                <SelectItem value='italy'>Italia</SelectItem>
                                            </SelectContent>
                                        </Select>    
                                    </FormControl>
                                <FormMessage />
                                </FormItem>
                        )}
                        />
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}