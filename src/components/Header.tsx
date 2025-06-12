"use client";

import React from "react";
import Image from "next/image";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { useTranslations } from "next-intl";
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
import { useCart } from "@/store/cart";
import { LanguageSelector } from "./LanguageSelector";
import { Link } from "@/i18n/routing";

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const { getTotalQuantity } = useCart();
  const totalQty = getTotalQuantity();

  // 翻訳フック
  const t = useTranslations("header");
  const tCommon = useTranslations("common");

  // Navigation items using translations
  const tNav = useTranslations("navigation");
  const navItems = [
    { label: tNav("home"), href: "/" },
    { label: tNav("about"), href: "/about" },
    { label: tNav("products"), href: "/products" },
  ];

  // Recent product with translations
  const recentProduct = {
    title: t("recentProduct.title"),
    subtitle: t("recentProduct.subtitle"),
    price: t("recentProduct.price"),
    img: "/images/suirin.jpg",
    href: "/products/1",
  };

  return (
    <header className="fixed top-0 left-0 w-full z-30 bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between text-black">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-3xl font-serif tracking-wide group-hover:opacity-90 text-black">
            {t("brand.name")}
          </span>
          <span className="hidden sm:block leading-snug text-xs opacity-80 whitespace-pre-line">
            {t("brand.subtitle")}
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

          {/* Language Selector */}
          <LanguageSelector variant="desktop" />

          <Separator orientation="vertical" className="h-4 bg-emerald-300" />

          {/* Cart */}
          <Link
            href="/cart"
            className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
          >
            <FiShoppingCart className="h-4 w-4" />
            <span className="text-xs">({totalQty})</span>
          </Link>
        </nav>

        {/* Mobile menu trigger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-transparent focus-visible:ring-0 text-black"
              aria-label={tCommon("menu")}
            >
              {open ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="!left-0 !right-0 w-full h-full p-0 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 text-emerald-50 overflow-y-auto"
          >
            <VisuallyHidden>
              <SheetTitle>{t("mobile.navigationMenu")}</SheetTitle>
            </VisuallyHidden>

            {/* Recent Product */}
            <div className="relative pt-12 pb-8 px-6 bg-gradient-to-b from-emerald-800/80 to-transparent">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-serif tracking-wide text-emerald-100">
                  {t("mobile.recentProduct")}
                </h3>
                <Link
                  href="/products"
                  className="text-sm flex items-center gap-1 hover:text-emerald-200 transition-colors text-emerald-300"
                >
                  {t("mobile.viewAll")}{" "}
                  <span className="text-lg leading-none">›</span>
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

            {/* Mobile nav items and controls */}
            <div className="px-6 mt-8 space-y-4">
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className="block text-emerald-100 hover:text-emerald-200 transition-colors py-2 text-lg"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}

              <Separator className="border-emerald-600/30" />

              <LanguageSelector
                variant="mobile"
                onLanguageChange={() => setOpen(false)}
              />

              <Separator className="border-emerald-600/30" />

              <SheetClose asChild>
                <Link
                  href="/cart"
                  className="flex items-center gap-2 text-emerald-100 hover:text-emerald-200 transition-colors py-2"
                >
                  <FiShoppingCart className="h-5 w-5" />
                  <span>
                    {tNav("cart")} ({totalQty})
                  </span>
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
