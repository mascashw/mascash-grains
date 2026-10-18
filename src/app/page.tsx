
"use client";

import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  featured: boolean;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then(setProducts)
      .catch(() => setMessage("Could not load products. Please check your database setup."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function addToCart(product: Product) {
    if (product.stock < 1) {
      setMessage("This item is out of stock.");
      return;
    }
    setCart((current) => [...current, product]);
    setMessage(`${product.name} added to your bag!`);
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <main className="min-h-screen bg-[#faf8f4] text-[#29251f]">
      <div className="bg-[#29251f] py-2 text-center text-xs tracking-[.3em] text-white">
        "MASCASH grain buying. Explore grain categories, enquire about buying prices, and contact our team about your harvest.",
      </div>

      
<header className="flex items-center justify-between border-b border-[#e7dfd4] bg-[#faf8f4] px-6 py-5 md:px-12">
  <a
    href="#"
    className="text-xl font-bold tracking-widest text-[#315b36]"
  >
    MASCASH
  </a>

  <nav className="hidden items-center gap-8 md:flex">
    <a href="#shop" className="text-sm hover:text-[#315b36]">
      Grain Varieties
    </a>
    <a href="#about" className="text-sm hover:text-[#315b36]">
      About Us
    </a>
    <a href="#contact" className="text-sm hover:text-[#315b36]">
      Contact
    </a>
  </nav>

  
  <div className="flex items-center gap-3">
    <a
      href="#contact"
      className="bg-[#315b36] px-4 py-2 text-sm text-white hover:bg-[#26472a]"
    >
      Sell Your Grain
    </a>

   <button
  onClick={() => setBagOpen(true)}
  className="border border-[#315b36] px-4 py-2 text-sm hover:bg-[#315b36] hover:text-white"
>
  Bag ({cart.length})
</button>
  </div>





</header>

      <section className="relative flex min-h-[480px] items-center overflow-hidden bg-[#b6a18d] md:min-h-[600px]">
        <img
  src="/images/background.jpg"
  alt="MASCASH grain buying"
  className="absolute inset-0 h-full w-full object-cover object-center"
/>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative px-8 py-20 text-white md:px-16">
          <p className="text-xs tracking-[.35em]">Farmer's Choice</p>
          <h1 className="mt-5 max-w-2xl font-serif text-5xl leading-tight md:text-7xl">
            Find your own High breed variety of Grains
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-7">
            **YOUR TRUSTED GRAIN BUYER**

# Quality Grain. Fair Prices. Reliable Service.

Sell your maize, soya beans, wheat and other grains to MASCASH. Contact our team to enquire about current buying prices, grain quality requirements and delivery arrangements.

**SELL YOUR GRAIN TODAY**
          </p>
          <a
            href="#shop"
            className="mt-8 inline-block bg-white px-8 py-4 text-xs tracking-widest text-black"
          >
            MASCASH GRAIN BUYING — FAIR PRICES, TRUSTED SERVICE, RELIABLE PAYMENTS.
          </a>
        </div>
      </section>

      <section id="shop" className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs tracking-[.3em] text-[#8b7965]">
              TRANSPARENCY IN EVERY TRANSACTION
            </p>
            <h2 className="mt-3 font-serif text-4xl">Our Varieties</h2>
          </div>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="border border-[#ded5c9] bg-transparent px-4 py-3 text-sm"
          />
        </div>

        {message && (
          <div className="my-5 flex justify-between border border-[#ded5c9] p-4 text-sm">
            <p>{message}</p>
            <button onClick={() => setMessage("")}>Close</button>
          </div>
        )}

        {loading ? (
          <p className="py-20 text-center">Loading your High breed Varieties...</p>
        ) : filtered.length === 0 ? (
          <p className="py-20 text-center">
            No products found. We may need to add sample products to your database.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 md:gap-8">
            {filtered.map((product) => (
              <article key={product.id}>
                <div className="relative aspect-[3/4] overflow-hidden bg-[#eee7dd]">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                  {product.featured && (
                    <span className="absolute left-2 top-2 bg-white px-3 py-2 text-[10px] tracking-widest">
                      FEATURED
                    </span>
                  )}
                </div>
                <p className="mt-4 text-[10px] uppercase tracking-widest text-[#8b7965]">
                  {product.category}
                </p>
                <h3 className="mt-2 font-serif text-lg">{product.name}</h3>
                <p className="mt-2 text-sm">${product.price.toFixed(2)}</p>
                <button
                  disabled={product.stock < 1}
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full border border-[#29251f] px-3 py-3 text-xs tracking-widest hover:bg-[#29251f] hover:text-white disabled:opacity-40"
                >
                  {product.stock < 1 ? "SOLD OUT" : "ADD TO BAG"}
                </button>
              </article>
            ))}
          </div>
        )}
      </section>









      <section
        id="about"
        className="bg-white px-6 py-16 md:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-xs tracking-[.3em] text-[#8b7965]">
            ABOUT MASCASH
          </p>

          <h2 className="mt-3 font-serif text-4xl">
            Your Trusted Grain Buyer
          </h2>

          <p className="mt-6 max-w-3xl text-sm leading-8 text-[#62594f]">
            MASCASH is committed to connecting grain producers
            with reliable grain-buying services. We welcome
            enquiries about maize, soya beans, wheat and other
            grain varieties. Our goal is to provide fair,
            transparent service and reliable communication
            throughout the grain-selling process.
          </p>
        </div>
      </section>

      <section
        id="contact"
        className="bg-[#eee7dd] px-6 py-16 md:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-xs tracking-[.3em] text-[#8b7965]">
            GET IN TOUCH
          </p>

          <h2 className="mt-3 font-serif text-4xl">
            Contact MASCASH
                      <div className="mt-6 space-y-3 text-sm">
            <p>
              <strong>Phone / WhatsApp:</strong>{" "}
              <a
                href="tel:0712683417"
                className="text-[#315b36] underline"
              >
                0712683417
              </a>
            </p>












            <p>
              <strong>Website:</strong>{" "}
              <a
                href="https://mascash.great-site.net"
                target="_blank"
                rel="noreferrer"
                className="text-[#315b36] underline"
              >
                mascash.great-site.net
              </a>

           </p>


 <a
              href="https://wa.me/263712683417?text=Hello%20MASCASH%2C%20I%20want%20to%20sell%20my%20grain."
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              Enquire to Sell Grain on WhatsApp
            </a>








          </div>
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-8">
            Would you like to sell your grain? Contact our team
            to enquire about current buying prices, grain
            quality requirements and delivery arrangements.
          </p>

          <p className="mt-4 text-sm font-medium">
            We look forward to hearing from you.
          </p>
        </div>
      </section>















      <footer className="bg-[#29251f] px-6 py-12 text-white">
        <h2 className="font-serif text-xl tracking-widest">MASCASH</h2>
        <p className="mt-3 text-sm text-white/70">
          Trusted grains. best for seasonality .
        </p>
        <p className="mt-8 text-xs text-white/50">
          © 2026 Mascash
        </p>
      </footer>

      {bagOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 text-[#29251f] shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Your Shopping Bag</h2>
              <button
                onClick={() => setBagOpen(false)}
                className="text-2xl"
                aria-label="Close shopping bag"
              >
                &times;
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="mt-6 text-sm">
                Your bag is empty. Add some grain products first.
              </p>
            ) : (
              <div className="mt-6 space-y-4">
                {cart.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex justify-between gap-4 border-b pb-3"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Price: ${item.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">Quantity: 1</p>
                    </div>
                    <p className="font-semibold">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                ))}

                <div className="flex justify-between pt-2 text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            )}

            <button
              onClick={() => setBagOpen(false)}
              className="mt-6 w-full bg-[#315b36] px-4 py-3 text-white"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}






    </main>
  );
}
