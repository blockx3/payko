import { redirect } from "next/navigation";
function UserPage() {
  redirect("/user/wallet/send");
}

export default UserPage;
