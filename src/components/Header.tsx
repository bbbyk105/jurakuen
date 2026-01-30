"use client";

import React from "react";
import Image from "next/image";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { useTranslations, useLocale } from "next-intl";
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
  const locale = useLocale();
  const { getTotalQuantity } = useCart();
  const totalQty = getTotalQuantity();

  const t = useTranslations("header");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("navigation");

  const navItems = [
    { label: tNav("home"), href: "/" },
    { label: tNav("about"), href: "/about" },
    { label: tNav("products"), href: "/products" },
    { label: tNav("matcha"), href: "/matcha" },
    { label: tNav("jas"), href: "/jas" },
  ];

  const recentProduct = {
    title: t("recentProduct.title"),
    subtitle: t("recentProduct.subtitle"),
    price: t("recentProduct.price"),
    img: "/images/products/chiyo.webp",
    href: "/products/1",
  };

  return (
    <header className="fixed top-0 left-0 w-full z-30 bg-transparent">
      <div className="relative mx-auto max-w-7xl px-6 py-6 lg:px-8 flex items-center justify-between text-black lg:justify-between">
        {/* スマホ：ロゴ（左） */}
        <Link
          href="/"
          className="lg:hidden z-10 hover:opacity-90 transition-opacity"
        >
          <Image
            src="/images/logos/logo_horizontal.png"
            alt={t("brand.name")}
            width={120}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* スマホ：メニュー（右） */}
        <div className="lg:hidden z-10">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-transparent focus-visible:ring-0 text-black"
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

              {/* Mobile menu header with logo */}
              <div className="px-6 pt-6 pb-4">
                <Image
                  src="/images/logos/logo_horizontal.png"
                  alt={t("brand.name")}
                  width={150}
                  height={50}
                  className="h-10 w-auto filter brightness-0 invert"
                />
              </div>

              {/* Recent Product */}
              <div className="relative pt-4 pb-8 px-6 bg-gradient-to-b from-emerald-800/80 to-transparent">
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

        {/* PC: ナビゲーション */}
        <nav className="hidden lg:flex items-center justify-between w-full text-sm font-medium">
          {/* PC ロゴ */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logos/logo_horizontal.png"
              alt={t("brand.name")}
              width={180}
              height={60}
              className="h-12 w-auto group-hover:opacity-90 transition-opacity"
              priority
            />
            {locale === "ja" && (
              <span className="leading-snug text-xs opacity-80 whitespace-pre-line ml-2">
                {t("brand.subtitle")}
              </span>
            )}
          </Link>

          {/* ナビゲーションリンク */}
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-emerald-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <LanguageSelector variant="desktop" />
            <Separator orientation="vertical" className="h-4 bg-emerald-300" />
            <Link
              href="/cart"
              className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
            >
              <FiShoppingCart className="h-4 w-4" />
              <span className="text-xs">({totalQty})</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
