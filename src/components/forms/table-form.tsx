"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Entries } from "type-fest";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

import { TableSchema } from "./schema";
import { useConfigStore } from "./store";

type TableConfig = z.infer<typeof TableSchema>;

const LABEL_MAPPING: Record<keyof TableConfig, string> = {
  skin: "Skin",
  rr: "RR",
  leaderboard: "Leaderboard",
  peakrank: "Peak Rank",
  previousrank: "Previous Rank",
  headshot_percent: "Headshot %",
  winrate: "Winrate",
  kd: "K/D Ratio",
  level: "Level",
};

export function TableForm() {
  const form = useForm<TableConfig>({
    resolver: zodResolver(TableSchema),
    defaultValues: TableSchema.parse({}),
    mode: "onChange",
  });

  const { watch } = form;
  const { update } = useConfigStore();

  useEffect(() => {
    const { unsubscribe } = watch((value) => {
      update({ table: value });
    });
    return () => unsubscribe();
  }, [watch, update]);

  return (
    <Form {...form}>
      <form className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
        {(
          Object.entries(TableSchema.shape) as Entries<typeof TableSchema.shape>
        ).map(([key, value]) => (
          <FormField
            key={key}
            control={form.control}
            name={key}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    {LABEL_MAPPING[key as keyof typeof LABEL_MAPPING]}
                  </FormLabel>
                  <FormDescription>{value.description}</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ))}
      </form>
    </Form>
  );
}
