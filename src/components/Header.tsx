"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { Button } from "../components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetTitle,
} from "../components/ui/sheet";
import { Separator } from "../components/ui/separator";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

/*
 * Header – 抹茶色テーマ
 * ----------------------------------------------------------
 * • Mobile (<lg): 抹茶グラデーションの全画面ドロワー
 * • Desktop (lg+): 抹茶色のインラインナビ
 */

const navItems = [
  { label: "Product", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Store", href: "/store" },
];

const recentProduct = {
  title: "FAS SUMMER SELECT KIT 03",
  subtitle: "サマーセレクト キット 03",
  price: "¥13,140 |税込|",
  img: "/images/sample-kit.png",
  href: "/product/fas-summer-select-kit-03",
};

const productCategories = ["All"];

export default function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-30 bg-transparent">
      {/* INNER WRAPPER */}
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between text-black">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-3xl font-serif tracking-wide group-hover:opacity-90 text-black">
            聚楽苑
          </span>
          {/* サブコピーは SM 以上でのみ表示 */}
          <span className="hidden sm:block leading-snug text-xs opacity-80">
            富士山麓の
            <br />
            無農薬緑茶
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-emerald-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Separator orientation="vertical" className="h-4 bg-emerald-300" />
          <Link
            href="/cart"
            className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
          >
            <FiShoppingCart className="h-4 w-4" />
            <span className="text-xs">(0)</span>
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-transparent focus-visible:ring-0 text-emerald-50 lg:text-emerald-800"
            >
              {open ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </Button>
          </SheetTrigger>

          {/* FULL-SCREEN DRAWER CONTENT */}
          <SheetContent
            side="right"
            className="!left-0 !right-0 w-full h-full p-0 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 text-emerald-50 overflow-y-auto"
          >
            {/* Add hidden title for accessibility */}
            <VisuallyHidden>
              <SheetTitle>Navigation Menu</SheetTitle>
            </VisuallyHidden>

            {/* Top gradient block */}
            <div className="relative pt-12 pb-8 px-6 bg-gradient-to-b from-emerald-800/80 to-transparent">
              <SheetClose asChild>
                <button className="absolute top-4 right-4 p-2 hover:bg-emerald-700/30 rounded-lg transition-colors">
                  <FiX className="h-6 w-6" />
                </button>
              </SheetClose>

              {/* Recent Product */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-serif tracking-wide text-emerald-100">
                  Recent Product
                </h3>
                <Link
                  href="/product"
                  className="text-sm flex items-center gap-1 hover:text-emerald-200 transition-colors text-emerald-300"
                >
                  View All <span className="text-lg leading-none">›</span>
                </Link>
              </div>

              <Link
                href={recentProduct.href}
                className="border border-emerald-400/30 bg-emerald-800/20 p-4 flex gap-4 hover:border-emerald-300/50 hover:bg-emerald-700/30 transition-all duration-200 rounded-lg"
              >
                <div className="shrink-0 w-24 h-24 relative bg-emerald-50/10 rounded-md overflow-hidden">
                  <Image
                    src={recentProduct.img}
                    alt={recentProduct.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col justify-center text-xs space-y-1">
                  <h4 className="font-medium text-sm leading-snug text-emerald-100">
                    {recentProduct.title}
                  </h4>
                  <p className="text-emerald-300">{recentProduct.subtitle}</p>
                  <p className="mt-1 text-emerald-200 font-medium">
                    {recentProduct.price}
                  </p>
                </div>
              </Link>
            </div>

            {/* NAV GROUPS */}
            <div className="px-6 space-y-12 pb-24">
              {/* MyPage */}
              <section>
                <h5 className="font-serif text-lg mb-6 text-emerald-200">
                  TopPage
                </h5>
                <div className="flex flex-col gap-4 text-sm">
                  <SheetClose asChild>
                    <Link
                      href="/login"
                      className="text-emerald-100 hover:text-emerald-200 transition-colors py-2"
                    >
                      Login
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/membership"
                      className="text-emerald-100 hover:text-emerald-200 transition-colors py-2"
                    >
                      Membership Program
                    </Link>
                  </SheetClose>
                </div>
              </section>

              <Separator className="border-emerald-600/30" />

              {/* Product categories */}
              <section>
                <h5 className="font-serif text-lg mb-6 text-emerald-200">
                  Products
                </h5>
                <div className="grid grid-cols-2 gap-y-4 gap-x-10 text-sm">
                  {productCategories.map((cat) => (
                    <SheetClose asChild key={cat}>
                      <Link
                        href={`/product?category=${cat.toLowerCase()}`}
                        className="text-emerald-100 hover:text-emerald-200 transition-colors py-2"
                      >
                        {cat}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </section>

              <Separator className="border-emerald-600/30" />

              {/* Information */}
              <section>
                <h5 className="font-serif text-lg mb-6 text-emerald-200">
                  Information
                </h5>
                <div className="flex flex-col gap-4 text-sm">
                  {[
                    { label: "News", href: "/news" },
                    { label: "Topics", href: "/topics" },
                    { label: "Journal", href: "/journal" },
                  ].map((info) => (
                    <SheetClose asChild key={info.href}>
                      <Link
                        href={info.href}
                        className="text-emerald-100 hover:text-emerald-200 transition-colors py-2"
                      >
                        {info.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </section>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
