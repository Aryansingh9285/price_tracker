import { NextResponse } from "next/server";

export async function GET (){
    return NextResponse.json({message: "Cron job to check prices"});
}

export async function POST (request){
  try {
    const authHeader = request.headers.get("Authorization");
    const cronJobSecret = process.env.CRON_JOB_SECRET;

if(!cronJobSecret || authHeader !== `Bearer ${cronJobSecret}`){
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE
  );

const { data: products, error:productError } = await supabase
    .from("products")
    .select("*");
if(productError) throw productError;
console.log(`Found ${products.length} products to check prices for.`);

const results ={
    total : products.length,
    updated: 0,
    failed: 0,
    priceChanges: 0,
    alertsSent: 0,
};
for (const product of products){
    try{
        const productData = await scrapeProduct(product.url);
        if(!productData.currentPrice){
            results.failed ++;
            continue;
        }

    }catch (error){
        results.failed +=1;
        console.log(`Failed to update product ID ${product.id}: ${error.message}`);
    }
}

  } catch (error) {
    console.error("Error in cron job:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    
  }
}