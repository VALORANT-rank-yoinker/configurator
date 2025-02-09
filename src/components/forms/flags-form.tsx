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

import { FlagsSchema } from "./schema";
import { useConfigStore } from "./store";

type FlagsConfig = z.infer<typeof FlagsSchema>;

const LABEL_MAPPING: Record<keyof FlagsConfig, string> = {
  last_played: "Last Played",
  auto_hide_leaderboard: "Auto Hide Leaderboard",
  pre_cls: "Clear Terminal",
  game_chat: "Game Chat",
  peak_rank_act: "Peak Rank Act",
  discord_rpc: "Discord RPC",
  aggregate_rank_rr: "Aggregate Rank RR",
};

export function FlagsForm() {
  const form = useForm<FlagsConfig>({
    resolver: zodResolver(FlagsSchema),
    defaultValues: FlagsSchema.parse({}),
    mode: "onChange",
  });

  const { watch } = form;
  const { update } = useConfigStore();

  useEffect(() => {
    const { unsubscribe } = watch((value) => {
      update({ flags: value });
    });
    return () => unsubscribe();
  }, [watch, update]);

  return (
    <Form {...form}>
      <form className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
        {(
          Object.entries(FlagsSchema.shape) as Entries<typeof FlagsSchema.shape>
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
