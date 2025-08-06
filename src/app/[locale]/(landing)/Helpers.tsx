import React from "react";

export const BlobDecor = ({
  pos,
  size = "w-96 h-96",
}: {
  pos: string;
  size?: string;
}) => (
  <div
    className={`absolute ${pos} ${size} bg-green-100/20 rounded-full blur-3xl`}
  />
);

export const BackgroundHerring = () => (
  <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg,#2d4a2b,#2d4a2b 1px,transparent 1px,transparent 15px),repeating-linear-gradient(-45deg,#2d4a2b,#2d4a2b 1px,transparent 1px,transparent 15px)",
      }}
    />
  </div>
);

export const IconWrapper = ({
  icon: Icon,
}: {
  icon: React.ComponentType<{ className?: string }>;
}) => (
  <div className="bg-matcha-light/10 p-3 rounded-full">
    <Icon className="w-5 h-5 text-matcha-dark" />
  </div>
);

export const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-start space-x-4">
    <IconWrapper icon={Icon} />
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-gray-700 font-medium text-sm leading-relaxed">
        {value}
      </p>
    </div>
  </div>
);
