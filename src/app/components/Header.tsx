"use client";

import React from "react";
import Link from "next/link";
import { FiMenu, FiShoppingCart } from "react-icons/fi";
import { Button } from "../components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "../components/ui/sheet";
import { Separator } from "../components/ui/separator";

const navItems = [
  { label: "Product", href: "/product" },
  { label: "About", href: "/about" },
  { label: "Store", href: "/store" },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-30">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-4 group">
          <span className="text-4xl md:text-5xl font-serif tracking-wide text-gray-900 group-hover:opacity-90">
            聚楽苑
          </span>
          <span className="leading-snug text-sm text-gray-800">
            富士山麓の
            <br />
            無農薬抹茶
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-900">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:opacity-80">
              {item.label}
            </Link>
          ))}
          <Separator orientation="vertical" className="h-4" />
          <Link
            href="/cart"
            className="flex items-center gap-1 hover:opacity-80"
          >
            <FiShoppingCart className="h-4 w-4" />{" "}
            <span className="text-xs">(0)</span>
          </Link>
        </nav>

        {/* Mobile hamburger + sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-transparent focus-visible:ring-0"
            >
              <FiMenu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 space-y-8 pt-12">
            <div className="flex flex-col gap-6 text-base font-medium">
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </SheetClose>
              ))}
              <Separator />
              <SheetClose asChild>
                <Link href="/login">Login</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/cart" className="flex items-center gap-2">
                  <FiShoppingCart className="h-4 w-4" /> Cart (0)
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
