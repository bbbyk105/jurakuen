/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

type InstagramShowcaseProps = {
  urls: string[];
};

const InstagramShowcase = ({ urls }: InstagramShowcaseProps) => {
  const locale = useLocale();

  useEffect(() => {
    const scriptId = "instagram-embed-script";
    const existing = document.getElementById(
      scriptId
    ) as HTMLScriptElement | null;

    const process = () => {
      // @ts-ignore
      window?.instgrm?.Embeds?.process?.();
    };

    if (!existing) {
      const s = document.createElement("script");
      s.id = scriptId;
      s.src = "https://www.instagram.com/embed.js";
      s.async = true;
      s.defer = true;
      s.onload = process;
      document.body.appendChild(s);
    } else {
      process();
    }
  }, [urls]);

  const title = locale === "ja" ? "Instagram" : "Instagram";
  const description =
    locale === "ja"
      ? "最新の投稿から雰囲気をご覧ください"
      : "Get a feel for us through our latest posts.";

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-0">
        <div className="text-center mb-10 md:mb-14">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-900">
            {title}
          </h3>
          <p className="mt-3 text-gray-600 text-sm md:text-base">
            {description}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {urls.map((url) => (
            <blockquote
              key={url}
              className="instagram-media w-full"
              data-instgrm-permalink={url}
              data-instgrm-version="14"
              style={{ background: "transparent", margin: 0 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramShowcase;
