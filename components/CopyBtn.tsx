"use client";
import { Copy } from "lucide-react";
import { Bounce, toast } from "react-toastify";

function CopyBtn({ text }: { text: string }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(location.origin + text);
  };
  return (
    <Copy
      onClick={() => {
        copyToClipboard();
        toast.success(`Payment Link Copied`, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        return;
      }}
      className="hover:cursor-pointer hover:text-purple-700"
    >
      Copy
    </Copy>
  );
}

export default CopyBtn;
