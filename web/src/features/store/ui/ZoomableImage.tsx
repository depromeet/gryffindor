import Image from "next/image";
import { useEffect, useState } from "react";

interface ZoomableImageProps {
  src: string;
  alt: string;
  setIsZoomed: (isZoomed: boolean) => void;
}

export function ZoomableImage({ src, alt, setIsZoomed }: ZoomableImageProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 10); // 작은 지연 시간 후에 visible 상태를 true로 설정

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setIsZoomed(false), 300);
  };
  return (
    <button
      type="button"
      onClick={handleClose}
      className={`fixed inset-0 flex justify-center items-center bg-[#00000080] z-[100] transition-opacity duration-800 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative w-2/3 aspect-square rounded-[20px] overflow-hidden">
        <Image src={src} alt={alt} fill className="object-cover cursor-pointer" />
      </div>
    </button>
  );
}
