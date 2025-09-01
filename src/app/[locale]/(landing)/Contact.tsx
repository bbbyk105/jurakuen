"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaTrain,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { IconWrapper, InfoRow } from "./Helpers";

const Contact = () => {
  const tContact = useTranslations("contact");
  const locale = useLocale();

  return (
    <div id="contact" className="py-24 relative overflow-hidden bg-white">
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* セクションヘッダー */}
        <header className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] text-gray-500 mb-4">ACCESS</p>
          <h2 className="text-xl md:text-2xl lg:text-4xl font-light text-gray-900 mb-6">
            {tContact("title")}
          </h2>
          <div className="w-16 h-px bg-gray-400 mx-auto mb-8" />
          <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed">
            {tContact("description")}
          </p>
        </header>

        {/* メインレイアウト */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* 店舗情報カード */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
              <div className="bg-gradient-to-r from-matcha-dark to-matcha-medium p-4">
                <h3 className="text-xl font-medium text-white">
                  {tContact("accessInfo")}
                </h3>
              </div>

              <CardContent className="space-y-6">
                <InfoRow
                  icon={FaMapMarkerAlt}
                  label={locale === "ja" ? "所在地" : "Location"}
                  value={tContact("address")}
                />
                <InfoRow
                  icon={FaPhone}
                  label={locale === "ja" ? "お電話" : "Phone"}
                  value="0545-34-0614"
                />
                <InfoRow
                  icon={FaEnvelope}
                  label={locale === "ja" ? "メール" : "Email"}
                  value="jurakuenfuji@gmail.com"
                />

                {/* 営業時間 */}
                <div className="flex items-start space-x-4">
                  <IconWrapper icon={FaClock} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-2">
                      {locale === "ja" ? "営業時間" : "Business Hours"}
                    </p>
                    <div className="space-y-1">
                      {(locale === "ja"
                        ? [
                            { day: "平日", hours: "10:00 - 18:00" },
                            { day: "定休日", hours: "土日祝" },
                          ]
                        : [
                            { day: "Weekdays", hours: "10:00 - 18:00" },
                            { day: "Closed", hours: "Weekends/Holidays" },
                          ]
                      ).map((b, i) => (
                        <div
                          key={i}
                          className="flex justify-between text-gray-700"
                        >
                          <span className="text-sm">{b.day}</span>
                          <span className="text-sm font-medium">{b.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <InfoRow
                  icon={FaTrain}
                  label={locale === "ja" ? "アクセス" : "Access"}
                  value={
                    locale === "ja" ? (
                      <>
                        JR富士駅より車で15分
                        <br />
                        新東名高速道路 新富士ICより車で10分
                      </>
                    ) : (
                      <>
                        15 min by car from JR Fuji Station
                        <br />
                        10 min by car from Shin-Fuji IC (Shin-Tomei Expressway)
                      </>
                    )
                  }
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Googleマップ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <iframe
                title={tContact("mapTitle")}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13048.415945458104!2d138.74390818715818!3d35.15402730000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601981006c2c7659%3A0x4c72734520720881!2z6IGa5qW16IuR!5e0!3m2!1sja!2sjp!4v1753596221218!5m2!1sja!2sjp"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>

        {/* セパレーター */}
        <div className="flex items-center justify-center gap-4 mt-16">
          <div className="w-20 h-px bg-gray-300" />
          <div className="w-2 h-2 bg-kin-gold rounded-full" />
          <div className="w-20 h-px bg-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
