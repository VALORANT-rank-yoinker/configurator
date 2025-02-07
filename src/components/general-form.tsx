"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { useEffect } from "react";

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

const FormSchema = z.object({
  weapon: z.enum(WEAPONS),
  chat_limit: z.coerce.number().int().positive().min(1).max(100).default(5),
});

export const DEFAULT_CONFIG = {
  weapon: WEAPONS[0],
  chat_limit: 5,
};

export function GeneralForm({
  onChange,
}: {
  onChange?: (value: z.infer<typeof FormSchema>) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: DEFAULT_CONFIG,
    mode: "onChange",
  });

  useEffect(() => {
    const { unsubscribe } = form.watch((value) => {
      const result = FormSchema.safeParse(value);
      if (result.success) onChange?.(result.data);
    });
    return () => unsubscribe();
  }, [form.watch]);

  return (
    <Form {...form}>
      <form
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <FormField
          control={form.control}
          name="weapon"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Weapon</FormLabel>
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
                        : "Select weapon"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search weapon..." />
                    <CommandList>
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {weapons.map((w) => (
                          <CommandItem
                            value={w.label}
                            key={w.value}
                            onSelect={() => {
                              form.setValue(
                                "weapon",
                                w.value as (typeof WEAPONS)[number]
                              );
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
                Only skins for this weapon will be shown in the table.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="chat_limit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chat Limit</FormLabel>
              <FormControl className="max-w-[200px]">
                <Input type="number" min={1} max={100} {...field} />
              </FormControl>
              <FormDescription>
                How many chat messages to display at once.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
