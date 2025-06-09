import React, { useState, ChangeEvent } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl text-matcha-dark mb-6 font-light">
            Contact
          </h2>
          <p className="text-lg text-gray-700">お気軽にお問い合わせください</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card data-aos="fade-right">
            <CardHeader>
              <CardTitle className="text-matcha-dark">
                お問い合わせフォーム
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="お名前"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border-matcha-light focus:border-matcha-dark"
                />
                <Input
                  type="email"
                  placeholder="メールアドレス"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border-matcha-light focus:border-matcha-dark"
                />
              </div>
              <Input
                placeholder="件名"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="border-matcha-light focus:border-matcha-dark"
              />
              <Textarea
                placeholder="お問い合わせ内容"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="border-matcha-light focus:border-matcha-dark"
              />
              <Button className="w-full bg-matcha-light hover:bg-matcha-dark text-white">
                <FaEnvelope className="w-4 h-4 mr-2" />
                送信
              </Button>
            </CardContent>
          </Card>

          {/* Map & Info */}
          <div className="space-y-8" data-aos="fade-left">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-matcha-dark font-semibold mb-4">
                  アクセス情報
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-center space-x-3">
                    <FaMapMarkerAlt className="w-5 h-5 text-matcha-light" />
                    <span>〒416-0000 静岡県富士市○○町○○番地</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaPhone className="w-5 h-5 text-matcha-light" />
                    <span>0545-XX-XXXX</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaEnvelope className="w-5 h-5 text-matcha-light" />
                    <span>info@juraku-en.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Google Maps */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3269.123456789!2d138.6764123!3d35.1612345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s%E5%AF%8C%E5%A3%AB%E5%B1%B1!5e0!3m2!1sja!2sjp!4v1234567890"
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
    </div>
  );
};

export default Contact;
