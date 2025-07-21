"use client";

import { useEffect, useId, useState } from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PropsType {
  products: ProductType[];
  setSelectedProduct: React.Dispatch<React.SetStateAction<ProductType | null>>;
}

export default function SelectSale({
  products,
  setSelectedProduct,
}: PropsType) {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (value) {
      const selectedProduct = products.find(
        (item) => item.id === Number(value),
      );
      setSelectedProduct(selectedProduct || null);
    } else {
      setSelectedProduct(null);
    }
  }, [value]);

  return (
    <div className="*:not-first:mt-2">
      <label htmlFor={id}>Select Product</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
          >
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {value
                ? products
                    .map((item) => ({
                      value: String(item.id),
                      label: item.name,
                    }))
                    .find((framework) => framework.value === value)?.label
                : "Select Product"}
            </span>
            <ChevronDownIcon
              size={16}
              className="text-muted-foreground/80 shrink-0"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search Product..." />
            <CommandList>
              <CommandEmpty>No Products found</CommandEmpty>
              <CommandGroup>
                {products
                  ?.map((item) => ({ value: item.id, label: item.name }))
                  .map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={String(framework.value)}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {framework.label}
                      {value === String(framework.value) && (
                        <CheckIcon size={16} className="ml-auto" />
                      )}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
