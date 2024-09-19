import { permanentRedirect } from "next/navigation";
function UserWalletPage() {
  permanentRedirect("/user/wallet/send");
}

export default UserWalletPage;
