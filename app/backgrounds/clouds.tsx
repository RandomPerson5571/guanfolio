import Image from "next/image";

import bgImage from "@/public/clouds-ship.png";

export default function CloudsBackground() {
  return (
    <Image
      src={bgImage}
      alt="Background"
      placeholder="blur" // Optional: adds a blur-up effect
      quality={100} // Optional: adjust compression
      fill
      sizes="100vw"
      style={{
        objectFit: "cover",
      }}
    />
  );
}
