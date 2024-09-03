import SideBar from "./SideBar";

function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex bg-slate-100"
      style={{
        height: "calc(100vh - 64px)",
      }}
    >
      <SideBar />
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default UserLayout;
