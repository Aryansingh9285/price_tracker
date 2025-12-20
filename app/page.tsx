import { Button } from "@/components/ui/button";
import Image from "next/image";
import {LogIn} from "lucide-react";


export default function Home() {
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

          <Button
            variant="default"
            size="sm"
            className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            Sign in
          </Button>
        </div>
      </header>
      
    </main>
  );
}