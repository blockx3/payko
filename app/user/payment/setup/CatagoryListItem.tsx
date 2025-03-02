"use client";
import { TogglePaymentCategory } from "@/app/actions/database";
import { Switch } from "@/components/ui/switch";
import { Loader2, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import DeletePaymentCategoryBtn from "./DeletePaymentCategory";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function CatagoriesList({
  category_id,
  name,
  active,
  email,
}: {
  category_id: string;
  name: string;
  active: boolean;
  email: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <div className="grid grid-cols-3 rounded-lg bg-gray-100 py-2 px-4">
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger className="text-start">
            <div
              className="text-gray-600 text-ellipsis max-w-40 overflow-hidden cursor-pointer hover:text-gray-800"
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(category_id);
                toast.success("Address Copied !!", {
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
              }}
            >
              {"..." + category_id.split("-").at(-1)}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{category_id}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="text-gray-600 px-1 rounded-md ">{name}</div>
      <div className="flex gap-4">
        <DeletePaymentCategoryBtn category_id={category_id} email={email} />
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <Switch
              checked={active}
              onCheckedChange={async (e) => {
                setLoading(true);
                const res = await TogglePaymentCategory({
                  state: e,
                  email: email,
                  category_id: category_id,
                });
                if (!res.success) {
                  alert(res.message);
                  return;
                }
                if (e) {
                  toast.success(
                    `${e ? "Toggled active" : "Toggled disabled"}`,
                    {
                      position: "bottom-right",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      transition: Bounce,
                    },
                  );
                  setLoading(false);
                  return;
                }
                toast.warn(`${e ? "Toggled active" : "Toggled disabled"}`, {
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
                setLoading(false);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default CatagoriesList;
