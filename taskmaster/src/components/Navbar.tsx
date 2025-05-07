import { header } from "framer-motion/client";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="container mx-auto px-4 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        {/* Logo */}
        <div className="w-10 h-10 bg-gray-200 rounded-md overflow-hidden">
          <Image
            src=""
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>

        <span className="font-semibold text-xl">TaskMaster</span>
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {" "}
        {/* hide a nav for mobile breakpoints */}
        <Link href="#features" className="text-sm font-medium">
          Features
        </Link>
        <Link href="#solutions" className="text-sm font-medium">
          Solution
        </Link>
        <Link href="#resources" className="text-sm font-medium">
          Resource
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <Button variant="ghost" className="text-white cursor-pointer">
          Login
        </Button>
        <Button
          variant="ghost"
          className="bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer"
        >
          Sign Up
        </Button>
      </div>
    </header>
  );
}
