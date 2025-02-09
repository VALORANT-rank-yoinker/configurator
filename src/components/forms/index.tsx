"use client";

import { cn } from "@/lib/utils";

import { FlagsForm } from "./flags-form";
import { GeneralForm } from "./general-form";
import { TableForm } from "./table-form";

function Label({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <>
      <h3
        className={cn("mt-10 text-xl text-neutral-300", {
          "pb-4": !description,
        })}
      >
        {title}
      </h3>
      {description && (
        <p className="pb-4 text-sm text-neutral-400">{description}</p>
      )}
    </>
  );
}

export function Forms() {
  return (
    <>
      <Label title="General Settings" />
      <GeneralForm />

      <Label
        title="Table Columns"
        description="Enable or disable table columns"
      />
      <TableForm />

      <Label title="Flags" description="Enable or disable flags" />
      <FlagsForm />
    </>
  );
}
