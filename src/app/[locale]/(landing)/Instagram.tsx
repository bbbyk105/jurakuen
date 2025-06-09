import Image from "next/image";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Instagram = () => {
  return (
    <div className="py-20 bg-washi-beige">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl text-matcha-dark mb-6 font-light">
            Instagram
          </h2>
          <p className="text-lg text-gray-700">
            日々の茶園の様子をご覧ください
          </p>
        </div>

        {/* Instagram Grid (Masonry風) */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
          data-aos="zoom-in"
        >
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={`/api/placeholder/300/${300 + (index % 3) * 50}`}
                alt={`Instagram post ${item}`}
                width={300}
                height={300 + (index % 3) * 50}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-matcha-dark bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <FaInstagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12" data-aos="fade-up">
          <Button
            variant="outline"
            className="border-matcha-light text-matcha-dark hover:bg-matcha-light hover:text-white"
          >
            <FaInstagram className="w-4 h-4 mr-2" />
            @juraku_en をフォロー
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Instagram;
