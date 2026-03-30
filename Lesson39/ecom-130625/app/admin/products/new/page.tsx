import { NewProductForm } from "@/app/admin/products/new/NewProductForm";

export default function AdminNewProductPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-[-0.02em]">Add new product</h1>
      <p className="mt-2 text-slate-300">Create a product with one or more images.</p>
      <NewProductForm />
    </div>
  );
}

