import { LoaderIcon } from "lucide-react";
import Image from "next/image";

interface ILoaderProps {
  title?: string;
}

const Loader = ({ title = "Auth Loading" }: ILoaderProps) => {
  return (
    <div className="h-screen w-screen flex-col gap-2 flex justify-center items-center">
      <Image
        src="/icons/loader.svg"
        alt="loader"
        width={32}
        height={32}
        className="animate-spin dark:flex hidden"
      />
      <LoaderIcon className="text-green-400 animate-spin duration-300 dark:hidden" />
      <span className="text-lg">{title}</span>
    </div>
  );
};

export default Loader;
