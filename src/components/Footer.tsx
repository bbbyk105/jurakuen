"use client";
import { Link } from "@/i18n/routing";
import React from "react";
import { FaInstagram } from "react-icons/fa";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">聚楽苑</h3>
            <div className="space-y-2 text-sm text-green-100">
              <p>〒417-0812</p>
              <p>静岡県富士市境 485-2</p>
              <p>TEL: 0545-34-0614</p>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">会社案内</h3>
            <ul className="space-y-2 text-sm text-green-100">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  蔵元の想い
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  酒造りへのこだわり
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  会社概要
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  アクセス
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">お問い合わせ</h3>
            <ul className="space-y-2 text-sm text-green-100">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  オンラインショップ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  酒蔵見学
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  お問い合わせフォーム
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-3">SNS</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-green-200 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-green-200 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-green-200">
              <p>&copy; 2025 聚楽苑. All rights reserved.</p>
              <div className="flex space-x-4">
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  プライバシーポリシー
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  利用規約
                </Link>
                <Link
                  href="/commerce"
                  className="hover:text-white transition-colors"
                >
                  特定商取引法
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
