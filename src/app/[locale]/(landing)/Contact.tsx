import { Card, CardContent } from "@/components/ui/card";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        <header className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-light text-matcha-dark mb-4">
            お問い合わせ
          </h2>
          <p className="text-lg text-gray-700">
            ご質問やご相談がございましたら、お気軽にご連絡ください。
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Info */}
          <Card data-aos="fade-left">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-matcha-dark">
                アクセス情報
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-matcha-light shrink-0" />
                  <span>〒417-0812 静岡県富士市境485-2</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FaPhone className="w-5 h-5 text-matcha-light shrink-0" />
                  <span>0545-34-0614</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FaEnvelope className="w-5 h-5 text-matcha-light shrink-0" />
                  <span>info@juraku-en.com</span>
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
              title="聚楽園所在地"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.6242223143734!2d138.6759925!3d35.1464575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601be4f4e004ae09%3A0xb1cbb30d33efce5b!2z5oi45byP5aSn!5e0!3m2!1sja!2sjp!4v1717916643144"
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
    </section>
  );
};

export default ContactSection;
