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
import { BlobDecor, IconWrapper, InfoRow } from "./Helpers";

const Contact = () => {
  const tContact = useTranslations("contact");
  const locale = useLocale();

  return (
    <section
      className="py-24 bg-[#f6f5f0] relative overflow-hidden"
      id="contact"
    >
      <BlobDecor pos="top-0 left-0" size="w-72 h-72" />
      <BlobDecor pos="bottom-0 right-0" size="w-96 h-96" />
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <header className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] text-gray-500 mb-4">ACCESS</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6">
            {tContact("title")}
          </h2>
          <div className="w-16 h-px bg-gray-400 mx-auto mb-8" />
          <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed">
            {tContact("description")}
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
              <div className="bg-gradient-to-r from-matcha-dark to-matcha-medium p-6">
                <h3 className="text-xl font-medium text-white">
                  {tContact("accessInfo")}
                </h3>
              </div>
              <CardContent className="p-8 space-y-6">
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
                            { day: "土日祝", hours: "10:00 - 19:00" },
                            { day: "定休日", hours: "火曜日" },
                          ]
                        : [
                            { day: "Weekdays", hours: "10:00 - 18:00" },
                            {
                              day: "Weekends/Holidays",
                              hours: "10:00 - 19:00",
                            },
                            { day: "Closed", hours: "Tuesdays" },
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
            <Card className="bg-white/80 backdrop-blur shadow-md">
              <CardContent className="p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-3">
                  {locale === "ja"
                    ? "ご来店の際のお願い"
                    : "Visitor Information"}
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-matcha-dark">•</span>
                    <span>
                      {locale === "ja"
                        ? "団体様でのご利用は事前にご連絡ください"
                        : "Please contact us in advance for group visits"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-matcha-dark">•</span>
                    <span>
                      {locale === "ja"
                        ? "イベント等で臨時休業の場合がございます"
                        : "May be temporarily closed for special events"}
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-16">
          <div className="w-20 h-px bg-gray-300" />
          <div className="w-2 h-2 bg-kin-gold rounded-full" />
          <div className="w-20 h-px bg-gray-300" />
        </div>
      </div>
    </section>
  );
};

export default Contact;
