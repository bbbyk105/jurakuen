"use client";
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

const FAQ = () => {
  const tAboutPage = useTranslations("aboutPage");
  const faqItems = [
    { key: "organicJas" },
    { key: "taste" },
    { key: "enjoyment" },
  ];

  return (
    <section className="py-24 bg-matcha-light/10">
      <div className="max-w-4xl mx-auto px-4 lg:px-0">
        <h2 className="text-center text-2xl md:text-3xl font-light text-gray-900 mb-8">
          {tAboutPage("faq.title")}
        </h2>
        <Accordion type="single" collapsible>
          {faqItems.map(({ key }, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>
                {tAboutPage(`faq.items.${key}.question`)}
              </AccordionTrigger>
              <AccordionContent>
                {tAboutPage(`faq.items.${key}.answer`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
