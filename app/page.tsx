import { Button } from "@/components/ui/button";
export const dynamic = "force-dynamic";
import Image from "next/image";
import AddProductForm from "../components/AddProductForm";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { LogIn, Rabbit, Shield, Bell, TrendingDown } from "lucide-react";
import { getProducts } from "./action";
import ProductCards from "@/components/ProductCards";

export default async function Home() {
const supabase = await createClient();

const {
  data: { user },
} = await supabase.auth.getUser();

// console.log("Current user:", user);

  const product = user ? await getProducts(): [];
  const FEATURES = [
    {
      icon: Rabbit,
      title: "Lightning Fast",
      description:
        "Deal Drop extracts prices in seconds, handling JavaScript and dynamic content",
    },
    {
      icon: Shield,
      title: "Always Reliable",
      description:
        "Works across all major e-commerce sites with built-in anti-bot protection",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get notified instantly when prices drop below your target",
    },
  ];

  return (
    <main className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/pic_logo.png"
              alt="Company Logo"
              width={600}
              height={200}
              className="h-10 w-auto"
              priority
            />
          </div>
<AuthButton user={user}/>
         
        </div>
      </header>
      <section className=" py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-2 rounded-full text-sm font-medium mb-6">
            My App is developed to help users manage their tasks efficiently and
            boost productivity.
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Never Miss a Price Change Again
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Stay ahead of the market with real-time price alerts and updates.
            Our app ensures you never miss a price change again, helping you
            make informed decisions and save money.
          </p>
        

{/* Product Form  Section */} 

<AddProductForm user={user}/>

{product.length === 0 && (
  <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
    {FEATURES.map(({icon: Icon , title, description})=>(
      <div key={title} className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
          <Icon className="w-6 h-6 text-orange-500" />
          </div>
<h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
<p className="text-sm text-gray-600">{description}</p>
        </div>
        
      
    ))}

  </div>
)}


        </div>
        
      </section>

       {user && product.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Your Tracked Products
            </h3>
            <span className="text-sm text-gray-500">
              {product.length} {product.length === 1 ? "product" : "products"}
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 items-start">
            {product.map((products) => (
              <ProductCards key={products.id} product={products} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {user && product.length === 0 && (
        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12">
            <TrendingDown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products yet
            </h3>
            <p className="text-gray-600">
              Add your first product above to start tracking prices!
            </p>
          </div>
        </section>
      )}



    </main>
  );
}
