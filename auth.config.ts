import type { NextAuthConfig } from "next-auth";
import google from "next-auth/providers/google";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [google],
  trustHost: true,
  callbacks: {
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/user");
      if (isOnDashboard) {
        if (isLoggedIn) {
          return true;
        }
        return false;
      }
      return true;
    },
  },
  // theme: {
  //   // TODO: Add your logo here
  //   logo: "logo_url",
  // },
} satisfies NextAuthConfig;
