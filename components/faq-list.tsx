"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { CaretDown } from "@phosphor-icons/react";
import { faqs, liveSite } from "@/lib/data";

export function FaqList() {
  return (
    <div>
      <Accordion.Root type="single" collapsible className="divide-y divide-ice">
        {faqs.map((item) => (
          <Accordion.Item key={item.q} value={item.q} className="py-6">
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-start justify-between gap-6 text-left text-lg font-semibold text-navy [&[data-state=open]>svg]:rotate-180">
                {item.q}
                <CaretDown
                  size={20}
                  className="mt-1 shrink-0 transition-transform"
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="pt-3 text-base leading-7 text-muted-foreground">
              {item.a}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
      <p className="mt-8 text-base">
        More questions?{" "}
        <a href={`${liveSite}/faqs`} className="font-semibold text-sky">
          Full FAQ
        </a>{" "}
        or{" "}
        <a href={`${liveSite}/contact`} className="font-semibold text-sky">
          contact us
        </a>
        .
      </p>
    </div>
  );
}
