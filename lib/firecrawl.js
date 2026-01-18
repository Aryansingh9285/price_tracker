import Firecrawl from "@mendable/firecrawl-js";

const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });

export async function scrapeProduct(url) {
  try {
    console.log("Starting scrape for URL:", url);
    
    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Firecrawl request timed out after 60 seconds")), 60000)
    );

    const scrapePromise = firecrawl.scrape(url, {
      formats: [
        {
          type: "json",
          schema: {
            type: "object",
            required: ["productName", "currentPrice"],
            properties: {
              productName: {
                type: "string",
              },
              currentPrice: {
                type: "string",
              },
              currencyCode: {
                type: "string",
              },
              productImageUrl: {
                type: "string",
              },
            },
          },
          prompt:
            "Extract the product name as 'productName' , current price as a number as 'currentPrice', currency code (INR , USD etc) as 'currencyCode' and product image URL as 'productImageUrl' if avaliable",
        },
      ],
    });

    const result = await Promise.race([scrapePromise, timeoutPromise]);

    console.log("Full Scrape result:", JSON.stringify(result, null, 2));
    
    // The extracted JSON is in result.json.json (nested structure from Firecrawl)
    let extractedData = null;
    
    // Check multiple possible locations for the extracted data
    if (result.json && result.json.json) {
      extractedData = result.json.json;
    } else if (result.json) {
      extractedData = result.json;
    } else if (result.data) {
      extractedData = result.data;
    }
    
    console.log("Extracted data:", JSON.stringify(extractedData, null, 2));
    
    if(!extractedData || !extractedData.productName || !extractedData.currentPrice){
      console.log("ERROR: Missing required fields. Full result:", JSON.stringify(result, null, 2));
      throw new Error("Required fields missing in the extracted data");
    }
    
    console.log("Extracted data:", extractedData);
    return extractedData;
  } catch (error) {
    console.error("Error scraping product:", error);
    throw error;
  }
}
