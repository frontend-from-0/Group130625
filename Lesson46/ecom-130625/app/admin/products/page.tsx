import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/utils";
import { getProducts } from "@/services/products/data";

export default async function AdminProductsPage() {
  const productRows = await getProducts();

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-[-0.02em]">Products</h1>
          <p className="mt-2 text-slate-300">
            {productRows.length === 0
              ? "No products in the database yet."
              : `${productRows.length} product${productRows.length === 1 ? "" : "s"} in MongoDB.`}
          </p>
        </div>
        <Button asChild className="shrink-0">
          <Link href="/admin/products/new">Add new product</Link>
        </Button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5 text-slate-200">
            <tr>
              <th className="text-left font-medium px-4 py-3">ID</th>
              <th className="text-left font-medium px-4 py-3">Image</th>
              <th className="text-left font-medium px-4 py-3">Title</th>
              <th className="text-left font-medium px-4 py-3">Price</th>
              <th className="text-left font-medium px-4 py-3">Images</th>
            </tr>
          </thead>
          <tbody>
            {productRows.length === 0 ? (
              <tr className="border-t border-white/10 text-slate-300">
                <td className="px-4 py-4" colSpan={5}>
                  No products found.
                </td>
              </tr>
            ) : (
              productRows.map((row) => (
                <tr key={row.id} className="border-t border-white/10 text-slate-100">
                  <td className="px-4 py-3">{row.id}</td>
                  <td className="px-4 py-3">
                    {row.images[0] ? (
                      <div className="relative h-10 w-10 overflow-hidden rounded-md border border-white/10 bg-slate-900/60">
                        <Image
                          src={row.images[0]}
                          alt={row.title}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{row.title}</td>
                  <td className="px-4 py-3">{formatMoney(row.price, row.currency)}</td>
                  <td className="px-4 py-3">{row.images.length}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

