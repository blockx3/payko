import { auth } from "@/auth";
import prisma from "@/lib/db";
import CatagoriesListItem from "./CatagoryListItem";
import { Bounce, ToastContainer } from "react-toastify";
import CreateCategory from "./CreateCategory";

async function UserPayment() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    include: {
      payment_category: true,
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
            <div>ID</div>
            <div>Name</div>
            <div>Action</div>
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
  );
}

export default UserPayment;
