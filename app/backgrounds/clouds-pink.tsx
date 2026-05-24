import Image from "next/image";

import bgImage from "@/public/pink-clouds-wallpaper.png";

export default function PinkCloudsBackground() {
  return (
    <Image
      src={bgImage}
      alt="Background"
      placeholder="blur" // Optional: adds a blur-up effect
      quality={75} // Optional: adjust compression
      fill
      // sizes="100vw"
      style={{
        objectFit: "cover",
      }}
    />
  );
}
