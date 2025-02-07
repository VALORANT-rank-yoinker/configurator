"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "./ui/switch";
import { useEffect } from "react";

const formSchema = z.object({
  skin: z.boolean().describe("Skin for the selected weapon."),
  rr: z.boolean().describe("Ranked Rating"),
  leaderboard: z.boolean().describe("Leaderboard"),
  peakrank: z.boolean().describe("Peak Rank"),
  previousrank: z.boolean().describe("Previous Rank"),
  headshot_percent: z.boolean().describe("Headshot % from previous history."),
  winrate: z.boolean().describe("Winrate"),
  kd: z.boolean().describe("K/D Ratio"),
  level: z.boolean().describe("Player Level if not hidden."),
});

export const DEFAULT_CONFIG: z.infer<typeof formSchema> = {
  skin: true,
  rr: true,
  leaderboard: true,
  peakrank: true,
  previousrank: false,
  headshot_percent: true,
  winrate: true,
  kd: false,
  level: true,
};

const LABEL_MAPPING: Record<keyof z.infer<typeof formSchema>, string> = {
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

export function TableForm({
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
      <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
        {Object.entries(formSchema.shape).map(([key, value]) => (
          <FormField
            key={key}
            control={form.control}
            name={key as any}
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
