import React from "react";
import { FaAward, FaCalendarAlt, FaLeaf, FaUsers } from "react-icons/fa";

const Sustainability = () => {
  return (
    <div className="py-20 bg-washi-beige">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl text-matcha-dark mb-6 font-light">
            Sustainability
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            無農薬栽培が地域生態系にもたらす循環と調和
          </p>
        </div>

        <div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          data-aos="zoom-in"
        >
          {[
            {
              icon: <FaLeaf className="w-12 h-12 text-matcha-light" />,
              title: "土壌保護",
              desc: "化学肥料を使わず土壌の健康を維持",
            },
            {
              icon: <FaUsers className="w-12 h-12 text-matcha-light" />,
              title: "生物多様性",
              desc: "様々な生き物が共生する茶園環境",
            },
            {
              icon: <FaAward className="w-12 h-12 text-matcha-light" />,
              title: "品質向上",
              desc: "自然の力で育つ深い味わい",
            },
            {
              icon: <FaCalendarAlt className="w-12 h-12 text-matcha-light" />,
              title: "持続可能性",
              desc: "次世代への責任ある茶づくり",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="text-center bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-matcha-dark font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sustainability;
