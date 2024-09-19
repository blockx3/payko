import { permanentRedirect } from "next/navigation";
function UserPage() {
  permanentRedirect("/user/wallet/send");
}

export default UserPage;
