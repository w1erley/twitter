import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/"
  }
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/explore/:path*",
    "/settings/:path*",
    '/((?!api|register).*)',
    // "/:username",
  ]
};

