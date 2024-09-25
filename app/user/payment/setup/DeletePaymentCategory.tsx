"use client";
import { Loader2, Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DeletePaymentCategory } from "@/app/actions/database";

function DeletePaymentCategoryBtn({
  email,
  category_id,
}: {
  email: string;
  category_id: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  async function handleDelete() {
    setLoading(true);
    const res = await DeletePaymentCategory({
      email: email,
      category_id: category_id,
    });
    if (res.success) {
      setError("Catagory Deleted Successfully");
      setLoading(false);
      router.refresh();
      return;
    }
    setError(res.message);
    setLoading(false);
    return;
  }
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Trash2Icon className="text-red-500 hover:text-red-600" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you absolutely sure to delete wallet?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              wallet from everywhere.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {error && <div className="text-sm text-wrap">{error}</div>}
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            {loading ? (
              <Button disabled className="space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <div>Please wait</div>
              </Button>
            ) : (
              <Button
                className="bg-red-500 hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default DeletePaymentCategoryBtn;
