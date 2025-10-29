import Image from "next/image";

interface ZoomableImageProps {
  src: string;
  alt: string;
  setIsZoomed: (isZoomed: boolean) => void;
}

export function ZoomableImage({ src, alt, setIsZoomed }: ZoomableImageProps) {
  return (
    <button
      type="button"
      onClick={() => setIsZoomed(false)}
      className="fixed inset-0 flex justify-center items-center bg-[#00000080] z-[100]"
    >
      <div className="relative w-2/3 aspect-square rounded-[20px] overflow-hidden">
        <Image src={src} alt={alt} fill className="object-cover cursor-pointer" />
      </div>
    </button>
  );
}
