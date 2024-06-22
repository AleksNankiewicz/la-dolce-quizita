import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "item-2",
    question: "Jak mogę zacząć korzystać z platformy?",
    answer:
      "Aby rozpocząć korzystanie z Quizymania, wystarczy się zarejestrować i zalogować.",
  },
  {
    id: "item-3",
    question: "Czy mogę tworzyć własne quizy?",
    answer:
      "Tak, możesz tworzyć i udostępniać własne quizy za pomocą naszego edytora.",
  },
  {
    id: "item-4",
    question: "Jak mogę edytować lub usunąć moje quizy?",
    answer:
      "Przejdź do sekcji 'Moje quizy', znajdź quiz, który chcesz edytować lub usunąć, i wybierz odpowiednią opcję.",
  },
  {
    id: "item-5",
    question: "Jak mogę tworzyć kolekcje quizów?",
    answer:
      "Dodaj ulubione quizy do kolekcji, klikając 'Dodaj do kolekcji' i wybierając lub tworząc nową kolekcję.",
  },
  {
    id: "item-6",
    question: "Czy muszę się logować, aby grać w quizy?",
    answer:
      "Tak, musisz być zarejestrowanym użytkownikiem i zalogować się, aby grać w quizy na Quizymania.",
  },
  {
    id: "item-7",
    question: "Jak mogę utworzyć mój profil?",
    answer:
      "Po rejestracji automatycznie otrzymasz swój profil, który możesz edytować i personalizować.",
  },
  {
    id: "item-8",
    question: "Jakie rodzaje quizów mogę znaleźć na Quizymania?",
    answer:
      "Możesz znaleźć quizy z różnych dziedzin, takich jak historia, nauka, kultura, sport, rozrywka i wiele innych.",
  },
  {
    id: "item-9",
    question: "Czy moje dane są bezpieczne na Quizymania?",
    answer:
      "Tak, dbamy o bezpieczeństwo Twoich danych zgodnie z obowiązującymi przepisami o ochronie danych.",
  },
  {
    id: "item-10",
    question: "Jak mogę skontaktować się z pomocą techniczną?",
    answer:
      "Możesz skontaktować się z nami za pomocą formularza kontaktowego na naszej stronie lub wysyłając e-mail na adres support@quizymania.com.",
  },
];

const Page = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Często zadawane pytania</h1>
      <div className="">
        <Accordion type="single" collapsible>
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-xl font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Page;
