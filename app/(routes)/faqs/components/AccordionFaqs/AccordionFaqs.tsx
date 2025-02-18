import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { dataFaqs } from "./AccordionFaqs.data"

export function AccordionFaqs() {
    return (
        <Accordion type="single" collapsible>
            {dataFaqs.map(({ id, question, answer }) => (
                <AccordionItem key={id} value={question}>
                    <AccordionTrigger className="no-underline hover:no-underline">{question}</AccordionTrigger>
                    <AccordionContent>
                        {answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}