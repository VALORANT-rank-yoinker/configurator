"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { WEAPONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { GeneralConfigSchema } from "./schema";
import { useConfigStore } from "./store";

type GeneralConfig = z.infer<typeof GeneralConfigSchema>;

const weapons = WEAPONS.map((weapon) => ({
  label: weapon,
  value: weapon,
}));

export function GeneralForm() {
  const form = useForm<GeneralConfig>({
    resolver: zodResolver(GeneralConfigSchema),
    defaultValues: GeneralConfigSchema.parse({}),
    mode: "onChange",
  });

  const { update } = useConfigStore();
  const { watch } = form;

  useEffect(() => {
    const { unsubscribe } = watch((value) => {
      update(value);
    });
    return () => unsubscribe();
  }, [watch, update]);

  return (
    <Form {...form}>
      <form
        className="grid w-full grid-cols-1 gap-2 md:grid-cols-2"
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
                        !field.value && "text-muted-foreground",
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
                      <CommandEmpty>No weapon found.</CommandEmpty>
                      <CommandGroup>
                        {weapons.map((w) => (
                          <CommandItem
                            value={w.label}
                            key={w.value}
                            onSelect={() => {
                              form.setValue(
                                "weapon",
                                w.value as (typeof WEAPONS)[number],
                              );
                            }}
                          >
                            {w.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                w.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
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
                {GeneralConfigSchema.shape.weapon.description}
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
                <Input
                  type="number"
                  {...field}
                  {...form.register("chat_limit", {
                    valueAsNumber: true,
                    min: 1,
                    max: 100,
                  })}
                />
              </FormControl>
              <FormDescription>
                {GeneralConfigSchema.shape.chat_limit.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
