"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { AuthModel } from "./AuthModel";
import { addProduct } from "@/app/action";
import { toast } from "sonner";

const AddProductForm = ({ user }) => {
  const [url, setUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [showAuthModel, setShowAuthModel] = useState(false);

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowAuthModel(true);
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("url", url);

    const result = await addProduct(formData);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(result.message || "Product added successfully");
      setUrl("");
    }
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handelSubmit} className="w-full max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste the Product Url (Amazon , Walmart , etc....)"
            className="h-12 text-base"
            required
            disabled={loading}
            size={"lg"}
          />
          <Button className="bg-orange-500 hover:bg-orange-800 h-10 sm:h-12 px-8">
            {loading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-4" />
                Loading ....
              </>
            ) : (
              "Track Product Price"
            )}
          </Button>
        </div>
      </form>
      <AuthModel
        isOpen={showAuthModel}
        onClose={() => setShowAuthModel(false)}
      />
    </>
  );
};

export default AddProductForm;
