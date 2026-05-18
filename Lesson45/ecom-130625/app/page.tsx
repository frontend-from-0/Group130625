import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/utils";
import { Currency } from '@/services/products/data';
import CheckoutButton from './CheckoutButton';

type Product = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
};

const products: Product[] = [
  {
    id: "p-1",
    title: "Aether ANC Headphones",
    price: 249.99,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p-2",
    title: "Pulse Mini Speaker",
    price: 89.0,
    imageUrl: "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p-3",
    title: "Nova Smartwatch 2",
    price: 179.5,
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p-4",
    title: "Orbit Wireless Earbuds",
    price: 129.99,
    imageUrl: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p-5",
    title: "Vertex Mechanical Keyboard",
    price: 139.0,
    imageUrl: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p-6",
    title: "Lumen 4K Monitor",
    price: 329.0,
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p-7",
    title: "ChargeDock Pro",
    price: 59.99,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p-8",
    title: "StreamCam Ultra",
    price: 109.0,
    imageUrl: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Home() {

  return (
    <main className="min-h-screen bg-[#060812] px-6 py-10 md:py-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] md:w-[1000px] h-[340px] md:h-[460px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[480px] md:w-[720px] h-[240px] md:h-[340px] bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

      <section className="relative mx-auto max-w-4xl">
        <header className="mb-8 md:mb-10">
          <h1 className="text-white text-2xl md:text-3xl font-semibold tracking-[-0.02em]">
            Featured electronics
          </h1>
          <p className="mt-2 text-slate-400 text-sm md:text-base">
            Curated picks for your desk, setup, and daily essentials.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {products.map((product) => (
            <article
              key={product.id}
              className="group h-full rounded-2xl border border-white/10 bg-white/4 backdrop-blur-md overflow-hidden flex flex-col"
            >
              <div className="relative aspect-4/3 bg-slate-900/60">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>

              <div className="p-4 flex flex-1 flex-col gap-3">
                <div>
                  <h2 className="text-white text-sm md:text-[15px] font-medium leading-snug">
                    {product.title}
                  </h2>
                  <p className="mt-1 text-blue-300 text-sm font-semibold">
                    {formatMoney(product.price, Currency.SEK, "sv-SE")}
                  </p>
                </div>

                <div className="mt-auto flex items-center gap-2 opacity-0 translate-y-1 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto">
                  {/* // TODO: price id should not be hardcoded here, instead read it from the product in MongoDB  */}
                  <CheckoutButton priceId='price_1TLopAQitHtctVUTDOFoUqz7'/>
                  <Button size="sm" variant="ghost" className="border border-white/20 text-white hover:bg-white/10 hover:text-white">
                    Like
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}