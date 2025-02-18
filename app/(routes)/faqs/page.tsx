import { AccordionFaqs } from "./components/AccordionFaqs";

export default function PageFaqs(){
    return(
        <div className="max-w-4xl mx-auto bg-backgorund shadow-md rounded-lg p-4">
            <h2 className="text-3xl mb-8">FAQS</h2>
            <div className="mb-5">
                <p>Las FAQs (Frequently Asked Questions) son preguntas frecuentes que los usuarios suelen hacer sobre un tema, producto o servicio. Sirven para resolver dudas rápidamente sin necesidad de contactar con soporte, mejorando la experiencia del usuario y reduciendo la carga de trabajo del equipo de atención.</p>
            </div>
            <AccordionFaqs />
        </div>
    )
}