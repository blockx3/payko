"use client";
import { UpdateNickName } from "@/app/actions/database";
import { PencilIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { useDebouncedCallback } from "use-debounce";

function NickName({ nickName, email }: { nickName: string; email: string }) {
  const [nickname, setNickName] = useState(() => nickName);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounced = useDebouncedCallback(async (value) => {
    await UpdateNickName({
      email: email,
      nickname: value,
    });
    console.log(" Nick Name Updated");
    toast.success("Nick Name Updated", {
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
  }, 1000);

  return (
    <div className="flex gap-4">
      <input
        ref={inputRef}
        className="text-lg p-0 m-0 text-gray-500 max-w-52"
        value={nickname}
        onChange={async (e) => {
          setNickName(e.target.value);
          await debounced(e.target.value);
        }}
      />
      <button
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
      >
        <PencilIcon size={18} className="opacity-80" />
      </button>
    </div>
  );
}

export default NickName;
