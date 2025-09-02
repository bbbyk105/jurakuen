"use client";
import { Link } from "@/i18n/routing";
import React from "react";
import { FaInstagram, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useTranslations } from "next-intl";

export const Footer: React.FC = () => {
  const t = useTranslations("footer");

  return (
    <footer className="bg-green-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">{t("companyName")}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-sm text-green-100">
                <FaMapMarkerAlt className="w-4 h-4 mt-1 text-green-300 shrink-0" />
                <div>
                  <p>{t("address.postalCode")}</p>
                  <p>{t("address.street")}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sm text-green-100">
                <FaPhone className="w-4 h-4 text-green-300 shrink-0" />
                <p>{t("address.phone")}</p>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">
              {t("sections.products.title")}
            </h3>
            <div>
              <Link
                href="/products"
                className="inline-flex items-center text-sm text-green-100 hover:text-white transition-colors group"
              >
                {t("sections.products.viewAll")}
                <span className="ml-1 transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">
              {t("sections.company.title")}
            </h3>
            <nav>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-sm text-green-100 hover:text-white transition-colors"
                  >
                    {t("sections.company.links.home")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-green-100 hover:text-white transition-colors"
                  >
                    {t("sections.company.links.about")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="text-sm text-green-100 hover:text-white transition-colors"
                  >
                    {t("sections.company.links.products")}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">
              {t("sections.contact.title")}
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-green-200 mb-2">
                  {t("sections.contact.socialMedia")}
                </p>
                <a
                  href="https://instagram.com/jurakuenfuji"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-sm text-green-100 hover:text-white transition-colors"
                >
                  <FaInstagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-sm text-green-200">{t("legal.copyright")}</p>
            </div>

            {/* Legal Links */}
            <nav className="flex flex-wrap justify-center lg:justify-end items-center gap-6">
              <Link
                href="/privacy"
                className="text-sm text-green-200 hover:text-white transition-colors"
              >
                {t("legal.privacyPolicy")}
              </Link>
              <Link
                href="/terms"
                className="text-sm text-green-200 hover:text-white transition-colors"
              >
                {t("legal.termsOfService")}
              </Link>
              <Link
                href="/commerce"
                className="text-sm text-green-200 hover:text-white transition-colors"
              >
                {t("legal.commerceLaw")}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};
