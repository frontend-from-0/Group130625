"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createProductAction } from "@/app/admin/products/new/actions";
import { initialCreateProductFormState } from "@/app/admin/products/new/form-state";

export function NewProductForm() {
  const [state, formAction, isPending] = useActionState(
    createProductAction,
    initialCreateProductFormState,
  );
  const safeState = state ?? initialCreateProductFormState;
  const fieldErrors = safeState.fieldErrors ?? {};
  const formData = safeState.data ?? initialCreateProductFormState.data;

  return (
    <form action={formAction} className="mt-6 grid gap-4 max-w-xl">
      <label className="grid gap-2">
        <span className="text-sm text-slate-200">Product title</span>
        <Input
          key={`title-${formData.title}-${safeState.status}`}
          type="text"
          name="title"
          defaultValue={formData.title}
          placeholder="e.g. Orbit Wireless Earbuds"
          aria-invalid={Boolean(fieldErrors.title)}
        />
        {fieldErrors.title ? (
          <p className="text-sm text-red-300">{fieldErrors.title}</p>
        ) : null}
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-slate-200">Price</span>
        <Input
          key={`price-${formData.price}-${safeState.status}`}
          type="number"
          name="price"
          step="0.01"
          defaultValue={formData.price}
          placeholder="0.00"
          aria-invalid={Boolean(fieldErrors.price)}
        />
        {fieldErrors.price ? (
          <p className="text-sm text-red-300">{fieldErrors.price}</p>
        ) : null}
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-slate-200">Image files</span>
        <Input
          type="file"
          name="images"
          multiple
          accept="image/*"
          aria-invalid={Boolean(fieldErrors.images)}
        />
        {fieldErrors.images ? (
          <p className="text-sm text-red-300">{fieldErrors.images}</p>
        ) : null}
        {formData.imageNames.length > 0 ? (
          <p className="text-sm text-slate-400">
            Previously selected: {formData.imageNames.join(", ")}. Re-select files if
            needed.
          </p>
        ) : null}
      </label>

      {safeState.message ? (
        <p className={safeState.status === "success" ? "text-sm text-emerald-300" : "text-sm text-red-300"}>
          {safeState.message}
        </p>
      ) : null}

      <Button type="submit" className="w-fit mt-2" disabled={isPending}>
        {isPending ? "Saving..." : "Save product"}
      </Button>
    </form>
  );
}
