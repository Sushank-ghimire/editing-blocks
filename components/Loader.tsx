import Image from "next/image";

export const Loader = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Image
        src="/icons/loader.svg"
        alt="loader"
        width={32}
        height={32}
        className="animate-spin"
      />
      Loading...
    </div>
  );
};
