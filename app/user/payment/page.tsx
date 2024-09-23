import { permanentRedirect } from "next/navigation";

function Payment() {
  permanentRedirect("/user/payment/setup");
  return <></>;
}

export default Payment;
