import { auth } from "@/auth";
import prisma from "@/lib/db";
import CatagoriesListItem from "./CatagoryListItem";
import { Bounce, ToastContainer } from "react-toastify";
import CreateCategory from "./CreateCategory";
import PaymentDetailList from "./PaymentDetailList";

import { Suspense } from "react";
import ReceivedBalance from "./ReceivedBalance";
async function UserPayment() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    include: {
      payment_category: true,
      payment_details: {
        include: {
          UserWallet: true,
          payment_category: true,
        },
      },
    },
  });
  user?.payment_category.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return (
    <>
      <div>
        <div className="m-1 p-1 max-w-2xl">
          <div className="text-xl mb-2 px-3 flex gap-2 justify-between items-center">
            <div>Payment Catagories</div>
            <CreateCategory
              email={user?.email as string}
              userID={user?.id as string}
            />
          </div>
          <div className="border p-1  min-h-52 rounded-lg flex flex-col gap-2">
            <div className="grid grid-cols-3 py-2 px-4 border-b-2">
              <div className="border-r border-l border-gray-400 pl-1">ID</div>
              <div className="border-r border-gray-400 pl-1">Name</div>
              <div className="border-r border-gray-400 pl-1">Action</div>
            </div>
            {user?.payment_category.map((category) => {
              return (
                <CatagoriesListItem
                  key={category.id}
                  category_id={category.category_id}
                  name={category.name}
                  active={category.active}
                  email={session?.user?.email as string}
                />
              );
            })}
          </div>
        </div>
        <div className="m-1 p-1 max-w-6xl">
          <div className="text-xl mb-2 px-3 flex gap-2 justify-between items-center">
            <div>Payment Details</div>
          </div>
          <div className="border p-1  min-h-52 rounded-lg flex flex-col gap-2">
            <div className="grid grid-cols-6 py-2 px-4 border-b-2">
              <div className="border-r border-l border-gray-500 pl-1">
                Title
              </div>
              <div className="border-r border-gray-400 pl-1">Category</div>
              <div className="border-r border-gray-400 pl-1">Wallet</div>
              <div className="border-r border-gray-500 pl-1">Payment Type</div>
              <div className="border-r border-gray-400 pl-1">
                Amount Received
              </div>
              <div className="border-r border-gray-500 pl-1">Actions</div>
            </div>
            {user?.payment_details.map((payment) => {
              return (
                <PaymentDetailList
                  key={payment.id}
                  data={[
                    payment.title as string,
                    payment.payment_category.name,
                    payment.UserWallet.walletname as string,
                    payment.payment_type,
                  ]}
                  active={payment.active}
                  payment_detail_id={payment.id}
                >
                  <Suspense fallback={<div>Loading...</div>}>
                    <ReceivedBalance payment_detail_id={payment.id} />
                  </Suspense>
                </PaymentDetailList>
              );
            })}
          </div>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </div>
    </>
  );
}

export default UserPayment;
