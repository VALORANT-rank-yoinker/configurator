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
} from "@/components/ui/form";
import { useEffect } from "react";
import { Switch } from "./ui/switch";

const formSchema = z.object({
  last_played: z.boolean().describe("Display last played date and time."),
  auto_hide_leaderboard: z
    .boolean()
    .describe("Hide leaderboard column when nobody is on leaderboard."),
  pre_cls: z.boolean().describe("Clear Terminal before each match."),
  game_chat: z.boolean().describe("Show game chat in terminal."),
  peak_rank_act: z.boolean().describe("Peak rank for the given Act."),
  discord_rpc: z.boolean().describe("Enable Discord RPC."),
  aggregate_rank_rr: z
    .boolean()
    .describe("Show aggregate rank for ranked matches."),
});

export const DEFAULT_CONFIG: z.infer<typeof formSchema> = {
  last_played: true,
  auto_hide_leaderboard: true,
  pre_cls: false,
  game_chat: true,
  peak_rank_act: true,
  discord_rpc: true,
  aggregate_rank_rr: true,
};

const LABEL_MAPPING: Record<keyof z.infer<typeof formSchema>, string> = {
  last_played: "Last Played",
  auto_hide_leaderboard: "Auto Hide Leaderboard",
  pre_cls: "Clear Terminal",
  game_chat: "Game Chat",
  peak_rank_act: "Peak Rank Act",
  discord_rpc: "Discord RPC",
  aggregate_rank_rr: "Aggregate Rank RR",
};

export function FlagForm({
  onChange,
}: {
  onChange?: (value: z.infer<typeof formSchema>) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_CONFIG,
    mode: "onChange",
  });

  useEffect(() => {
    const { unsubscribe } = form.watch((value) => {
      onChange?.(value as z.infer<typeof formSchema>);
    });
    return () => unsubscribe();
  }, [form, onChange]);

  return (
    <Form {...form}>
      <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
        {Object.entries(formSchema.shape).map(([key, value]) => (
          <FormField
            key={key}
            control={form.control}
            name={key as keyof z.infer<typeof formSchema>}
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
