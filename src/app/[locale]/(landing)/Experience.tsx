import React, { useEffect, useState, ChangeEvent } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const experiences = [
  {
    title: "茶畑散策",
    description: "富士山を望む茶畑で、有機栽培の茶葉に触れる体験",
    image: "/api/placeholder/600/400",
  },
  {
    title: "石臼挽き体験",
    description: "伝統の石臼で茶葉を挽く、貴重な製茶体験",
    image: "/api/placeholder/600/400",
  },
  {
    title: "茶道体験",
    description: "自園の抹茶で茶道の心を学ぶ静寂なひととき",
    image: "/api/placeholder/600/400",
  },
];

const Experience = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // 自動スライド
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % experiences.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % experiences.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + experiences.length) % experiences.length
    );
  };

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
            Experience
          </h2>
          <p className="text-lg text-gray-700">
            茶園での特別な体験をお楽しみください
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mb-16" data-aos="fade-up">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {experiences.map((exp, index) => (
                <div key={index} className="w-full flex-shrink-0 relative">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    width={600}
                    height={400}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-matcha-dark bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-3xl font-light mb-4">{exp.title}</h3>
                      <p className="text-lg">{exp.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all"
          >
            <FaChevronLeft className="w-6 h-6 text-matcha-dark" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all"
          >
            <FaChevronRight className="w-6 h-6 text-matcha-dark" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {experiences.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? "bg-matcha-light" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 体験予約フォーム */}
        <Card className="max-w-2xl mx-auto" data-aos="fade-up">
          <CardHeader>
            <CardTitle className="text-matcha-dark text-center">
              体験予約
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
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                type="date"
                name="date"
                className="border-matcha-light focus:border-matcha-dark"
              />
              <Input
                type="number"
                placeholder="人数"
                min="1"
                name="people"
                className="border-matcha-light focus:border-matcha-dark"
              />
            </div>
            <Textarea
              placeholder="ご要望やメッセージ"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="border-matcha-light focus:border-matcha-dark"
            />
            <Button className="w-full bg-matcha-light hover:bg-matcha-dark text-white">
              予約申し込み
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Experience;
