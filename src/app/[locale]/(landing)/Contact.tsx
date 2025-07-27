import { Card, CardContent } from "@/components/ui/card";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useTranslations } from "next-intl";

const Contact = () => {
  const t = useTranslations("contact");

  return (
    <div id="contact" className="py-20 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        <header className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl text-matcha-dark mb-6 font-light">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-700">{t("description")}</p>
        </header>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Info */}
          <Card data-aos="fade-left">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-matcha-dark">
                {t("accessInfo")}
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-matcha-light shrink-0" />
                  <span>{t("address")}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FaPhone className="w-5 h-5 text-matcha-light shrink-0" />
                  <span>0545-34-0614</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FaEnvelope className="w-5 h-5 text-matcha-light shrink-0" />
                  <span>jurakuenfuji@gmail.com</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Google Map */}
          <div
            data-aos="fade-right"
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <iframe
              title={t("mapTitle")}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13048.415945458104!2d138.74390818715818!3d35.15402730000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601981006c2c7659%3A0x4c72734520720881!2z6IGa5qW96IuR!5e0!3m2!1sja!2sjp!4v1753596221218!5m2!1sja!2sjp"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
