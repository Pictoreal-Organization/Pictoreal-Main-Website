import NextAuth from "next-auth";
export const runtime = "nodejs";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  session: { strategy: "jwt" },
  debug: process.env.NODE_ENV !== "production",
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("Auth attempt for:", credentials?.email);
          if (!credentials?.email || !credentials?.password) {
            console.log("Missing credentials");
            return null;
          }
          
          console.log("Connecting to database...");
          await connectToDatabase();
          console.log("Database connected");
          
          console.log("Looking for user:", credentials.email);
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            console.log("User not found");
            return null;
          }
          
          console.log("User found:", {
            id: user._id,
            name: user.name,
            email: user.email,
            department: user.department,
            yearOfPassing: user.yearOfPassing,
            role: user.role
          });
          
          console.log("User found, checking password...");
          const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
          if (!isValid) {
            console.log("Invalid password");
            return null;
          }
          
          console.log("Authentication successful");
          const userData = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            department: user.department,
            yearOfPassing: user.yearOfPassing,
          };
          console.log("Returning user data:", userData);
          return userData;
        } catch (err) {
          console.error("Authorize error:", err);
          console.error("Error stack:", err.stack);
          return null; // Return null instead of throwing
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.department = user.department;
        token.yearOfPassing = user.yearOfPassing;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.department = token.department;
        session.user.yearOfPassing = token.yearOfPassing;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirect callback:", { url, baseUrl });
      
      // If it's a relative URL, make it absolute
      if (url.startsWith("/")) {
        const redirectUrl = `${baseUrl}${url}`;
        console.log("Redirecting to:", redirectUrl);
        return redirectUrl;
      }
      
      // If it's the same origin, allow it
      try {
        if (new URL(url).origin === baseUrl) {
          console.log("Same origin redirect:", url);
          return url;
        }
      } catch (e) {
        console.log("Invalid URL, redirecting to dashboard");
      }
      
      // Otherwise redirect to the dashboard
      const dashboardUrl = `${baseUrl}/pictoblogs`;
      console.log("Default redirect to dashboard:", dashboardUrl);
      return dashboardUrl;
    },
  },
  pages: {
    signIn: "/pictoblogs/login",
    error: "/pictoblogs/login?error=AuthenticationError",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

