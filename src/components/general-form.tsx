"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "cmdk";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect } from "react";
import { Button } from "./ui/button";

const WEAPONS = [
  "Vandal",
  "Phantom",
  "Bulldog",
  "Guardian",
  "Judge",
  "Bucky",
  "Odin",
  "Ares",
  "Operator",
  "Outlaw",
  "Marshal",
  "Spectre",
  "Stinger",
  "Ghost",
  "Sheriff",
  "Shorty",
  "Frenzy",
  "Classic",
  "Melee",
] as const;

const weapons = WEAPONS.map((weapon) => ({
  label: weapon,
  value: weapon,
}));

const formSchema = z.object({
  weapon: z.enum(WEAPONS).describe("Weapon to show skin for."),
  chat_limit: z.number().min(1).max(100).describe("Chat limit"),
});

export const DEFAULT_CONFIG: z.infer<typeof formSchema> = {
  weapon: "Vandal",
  chat_limit: 5,
};

const LABEL_MAPPING: Record<keyof z.infer<typeof formSchema>, string> = {
  weapon: "Weapon",
  chat_limit: "Chat Limit",
};

export function GeneralForm({
  onChange,
}: {
  onChange?: (value: z.infer<typeof formSchema>) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_CONFIG,
  });

  useEffect(() => {
    const { unsubscribe } = form.watch((value) => {
      onChange?.(value as any);
    });
    return () => unsubscribe();
  }, [form.watch]);

  return (
    <Form {...form}>
      <form className="w-full">
        <FormField
          control={form.control}
          name="weapon"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{LABEL_MAPPING.weapon}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? weapons.find((w) => w.value === field.value)?.label
                        : "Select Weapon"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search weapon..." />
                    <CommandList>
                      <CommandEmpty>No Weapon found.</CommandEmpty>
                      <CommandGroup>
                        {weapons.map((w) => (
                          <CommandItem
                            value={w.label}
                            key={w.value}
                            onSelect={() => {
                              form.setValue("weapon", w.value);
                            }}
                          >
                            {w.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                w.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                {formSchema.shape.weapon.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
