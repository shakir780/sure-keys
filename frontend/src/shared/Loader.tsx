import Spinner from "@assets/icons/Spinner";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div className="fixed inset-0 z-50 bg-opacity-10 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[70px] h-[70px] rounded-full border-[6px] border-transparent border-t-green-500 animate-spin" />
    </div>
  );
};

export default Loader;
