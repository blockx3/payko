"use client";
import { CirclePlusIcon, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CreatePaymentCategory } from "@/app/actions/database";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

function CreateCategory({ email, userID }: { email: string; userID: string }) {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function handleSubmit() {
    if (!categoryName) {
      alert("Please enter a name");
      return;
    }
    setLoading(true);
    setError("");
    const res = await CreatePaymentCategory({
      email: email,
      name: categoryName,
      userId: userID,
    });
    if (res.success) {
      setError("Creation Successful");
      setLoading(false);
      router.refresh();
      return;
    }
    setError(res.message);
    setLoading(false);
    return;
  }
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-center cursor-pointer gap-1 opacity-50 hover:opacity-100">
          Add New
          <CirclePlusIcon />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
          <DialogDescription>
            Enter the name of the category you want to create.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              onChange={(e) => {
                setError("");
                setCategoryName(e.target.value);
              }}
            />
          </div>
          <div>{error && error}</div>
        </div>
        <DialogFooter>
          {loading ? (
            <Button disabled className="space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <div>Please wait</div>
            </Button>
          ) : (
            <Button onClick={handleSubmit}>Create</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCategory;
