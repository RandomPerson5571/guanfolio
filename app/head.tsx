import React from "react";

export default function Head() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ethan Guan",
    url: "https://ethanguan.dev",
    jobTitle: "High School Student",
    affiliation: "St. Theresa of Lisieux",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Richmond Hill",
      addressRegion: "Ontario",
      addressCountry: "Canada",
    },
    sameAs: [],
  };

  return (
    <>
      <link rel="canonical" href="https://ethanguan.dev" />
      <meta name="author" content="Ethan Guan" />
      <meta name="theme-color" content="#0f172a" />
      <meta
        name="format-detection"
        content="telephone=no,email=no,address=no"
      />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
