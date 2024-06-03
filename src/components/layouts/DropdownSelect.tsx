import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

type DropdownSelectProps = {
  title: string;
  selectedValue: string;
  options: { value: string; title: string }[];
  onChange: (value: string) => void;
};

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  title,
  selectedValue,
  options,
  onChange,
}) => {
  return (
    <Accordion className="md:hidden" type="single" collapsible>
      <h1 className="-mb-1 text-lg font-semibold">{title}</h1>
      <AccordionItem value="item-1">
        <AccordionTrigger className="border-b-2 border-b-primary pb-2 text-xl font-semibold">
          {options.find((option) => option.value === selectedValue)?.title ||
            "Select an option"}
        </AccordionTrigger>
        <AccordionContent className="flex items-center gap-2 py-6">
          <RadioGroup value={selectedValue} onValueChange={onChange}>
            {options.map((option) => (
              <div className="flex items-center space-x-3" key={option.value}>
                <RadioGroupItem
                  value={option.value}
                  id={`radio-${option.value}`}
                />
                <Label
                  className="text-xl font-semibold"
                  htmlFor={`radio-${option.value}`}
                >
                  {option.title}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DropdownSelect;
