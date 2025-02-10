import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex justify-center items-center w-full mb-4">
      <div className="relative w-[200px] h-[60px]">
        <Image
          src="/photoresource/logo-computama.png"
          alt="Computama Logo"
          fill
          priority
          className="object-contain"
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  );
} 