import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/utils";

export default async function AdminProductsPage() {
  const productRows = await prisma.product.findMany({
    orderBy: { title: "desc" },
    select: {
      id: true,
      title: true,
      price: true,
      currency: true,
      images: true,
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-[-0.02em]">Products</h1>
      <p className="mt-2 text-slate-300">Products currently stored in MongoDB.</p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5 text-slate-200">
            <tr>
              <th className="text-left font-medium px-4 py-3">ID</th>
              <th className="text-left font-medium px-4 py-3">Title</th>
              <th className="text-left font-medium px-4 py-3">Price</th>
              <th className="text-left font-medium px-4 py-3">Images</th>
            </tr>
          </thead>
          <tbody>
            {productRows.length === 0 ? (
              <tr className="border-t border-white/10 text-slate-300">
                <td className="px-4 py-4" colSpan={4}>
                  No products found.
                </td>
              </tr>
            ) : (
              productRows.map((row) => (
                <tr key={row.id} className="border-t border-white/10 text-slate-100">
                  <td className="px-4 py-3">{row.id}</td>
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

