import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { verifyTOTP } from "./totp";
import { verifyExchangeAuth } from "./exchange-auth";

const ADMIN_EMAILS = [
  "mohammed.iqbal@halabjagroup.com",
  "moham_iqbal99@gmail.com",
  "admin@badwadachoon.local"
];

const providers: any[] = [
  CredentialsProvider({
    id: "viewer-login",
    name: "Viewer Code",
    credentials: {
      code: { label: "Code", type: "password" },
    },
    async authorize(credentials) {
      const code = credentials?.code?.trim().toLowerCase();
      if (!code) {
        throw new Error("تکایە کۆدی بینین بنووسە");
      }
      if (code === "view2026" || code === "viewer2026") {
        return { id: "viewer", name: "بینەر (Viewer)", email: "viewer@badwadachoon.local", role: "viewer" };
      }
      throw new Error("کۆدی بینین هەڵەیە. تکایە دووبارە هەوڵ بدەرەوە");
    },
  }),
  CredentialsProvider({
    id: "guest-login",
    name: "Guest",
    credentials: {},
    async authorize() {
      return { id: "guest", name: "میوان (Guest)", email: "guest@badwadachoon.local", role: "guest" };
    },
  }),
  CredentialsProvider({
    id: "email-login",
    name: "Email Login",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
      totpCode: { label: "2FA Code", type: "text" },
    },
    async authorize(credentials) {
      if (!credentials?.email) {
        throw new Error("تکایە ناونیشانی ئیمەیڵ بنووسە");
      }
      
      const email = credentials.email.toLowerCase().trim();
      const password = (credentials.password || "").trim();
      const totpCode = (credentials.totpCode || "").trim();
      const isAdminEmail = ADMIN_EMAILS.includes(email);

      let user = null;
      try {
        user = await prisma.userAccount.findUnique({
          where: { email }
        });

        if (!user) {
          throw new Error("ئەم ناونیشانی ئیمەیڵە لە سیستەمدا تۆمار نەکراوە. تکایە سەرەتا خۆت تۆمار بکە یان لە ڕێگەی Google بچۆ ژوورەوە.");
        } else {
          // Check if account is pending approval by admin
          if (user.status === "pending" && !isAdminEmail) {
            throw new Error("هەژمارەکەت لە چاوەڕوانیی پەسەندکردندایە لەلایەن بەڕێوەبەری سەرەکی (محمد اقبال غفار). دوای پەسەندکردن دەتوانیت بچیتە ژوورەوە.");
          }

          // Check if account is suspended
          if (user.status === "blocked" || user.status === "inactive") {
            throw new Error("ئەم هەژمارە ناچالاک کراوە. تکایە پەیوەندی بە بەڕێوەبەرەوە بکە.");
          }

          // Verify password strictly from database (no hardcoded passwords)
          const userCode = user.authCode?.trim();
          if (!userCode || userCode !== password) {
            throw new Error("تێپەڕوشە یان کۆدی چوونەژوورەوە هەڵەیە");
          }

          // Verify Google Authenticator 2FA if enabled
          if (user.twoFactorEnabled && user.twoFactorSecret) {
            if (!totpCode) {
              throw new Error("2FA_REQUIRED");
            }
            const isTotpValid = verifyTOTP(user.twoFactorSecret, totpCode);
            if (!isTotpValid) {
              throw new Error("کۆدی ٦ ژمارەیی Google Authenticator هەڵەیە یان بەسەرچووە.");
            }
          }

          if (isAdminEmail && user.role !== "admin") {
            user = await prisma.userAccount.update({
              where: { email },
              data: { role: "admin", status: "active" }
            });
          }
        }
      } catch (dbErr: any) {
        throw new Error(dbErr.message || "هەڵەیەک ڕوویدا لە پەیوەستبوون بە سیستەم");
      }

      return { 
        id: user.id, 
        name: user.name || email.split("@")[0], 
        email: user.email, 
        role: user.role 
      };
    },
  }),
  CredentialsProvider({
    id: "exchange-login",
    name: "Halabja Group Outlook Exchange",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email) {
        throw new Error("تکایە ناونیشانی پۆستی کۆمپانیا بنووسە");
      }
      if (!credentials?.password) {
        throw new Error("تکایە تێپەڕوشەی پۆستی کۆمپانیا بنووسە");
      }

      const email = credentials.email.toLowerCase().trim();
      const password = credentials.password;
      const isAdminEmail = ADMIN_EMAILS.includes(email);

      // Verify in real-time against mail.halabjagroup.com Exchange server
      const authResult = await verifyExchangeAuth(email, password);
      if (!authResult.success) {
        throw new Error(authResult.error || "ئیمەیڵ یان تێپەڕوشەی پۆستی کۆمپانیا هەڵەیە");
      }

      // Exchange authenticated successfully!
      let user = null;
      try {
        user = await prisma.userAccount.findUnique({
          where: { email }
        });

        if (!user) {
          // Auto-provision user account for verified Halabja Group employee
          user = await prisma.userAccount.create({
            data: {
              email,
              name: email.split("@")[0],
              role: isAdminEmail ? "admin" : "user",
              status: "active",
              authCode: null
            }
          });
        } else {
          if (user.status === "blocked" || user.status === "inactive") {
            throw new Error("ئەم هەژمارە ناچالاک کراوە. تکایە پەیوەندی بە بەڕێوەبەرەوە بکە.");
          }
          if (isAdminEmail && user.role !== "admin") {
            user = await prisma.userAccount.update({
              where: { email },
              data: { role: "admin", status: "active" }
            });
          }
        }
      } catch (dbErr: any) {
        throw new Error(dbErr.message || "هەڵەیەک ڕوویدا لە دروستکردنی دانیشتن لە داتابەیس");
      }

      return {
        id: user.id,
        name: user.name || email.split("@")[0],
        email: user.email,
        role: user.role
      };
    },
  }),
];

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (googleClientId && googleClientSecret) {
  providers.push(
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    })
  );
}

if (process.env.AZURE_AD_CLIENT_ID && process.env.AZURE_AD_CLIENT_SECRET) {
  providers.push(
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID || "common",
    })
  );
}

export const authOptions: NextAuthOptions = {
  providers,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        if (user.id === "viewer") {
          token.role = "viewer";
          token.username = "بینەر (Viewer)";
          token.status = "active";
        } else if (user.id === "guest") {
          token.role = "guest";
          token.username = "میوان (Guest)";
          token.status = "active";
        } else if (user.email) {
          const email = user.email.toLowerCase();
          const isAdmin = ADMIN_EMAILS.includes(email);
          
          try {
            let dbUser = await prisma.userAccount.findUnique({
              where: { email },
            });

            if (!dbUser) {
              dbUser = await prisma.userAccount.create({
                data: {
                  email,
                  name: user.name || email.split("@")[0],
                  role: isAdmin ? "admin" : "user",
                  status: isAdmin ? "active" : "pending",
                  authCode: null
                }
              });
            } else if (isAdmin && dbUser.role !== "admin") {
              dbUser = await prisma.userAccount.update({
                where: { email },
                data: { role: "admin", status: "active" }
              });
            }

            token.role = isAdmin ? "admin" : dbUser.role;
            token.status = dbUser.status || "active";
            token.username = dbUser.name || user.name || "User";

            // CRITICAL: NEVER put large base64 data URLs in JWT token!
            // NextAuth stores JWT tokens in cookies; strings > 4KB trigger Vercel's 494 REQUEST_HEADER_TOO_LARGE.
            if (dbUser.image && (dbUser.image.startsWith("http://") || dbUser.image.startsWith("https://")) && dbUser.image.length < 500) {
              token.image = dbUser.image;
            } else if (dbUser.image) {
              token.image = `/api/user/avatar?email=${encodeURIComponent(email)}`;
            } else if (user.image && (user.image.startsWith("http://") || user.image.startsWith("https://")) && user.image.length < 500) {
              token.image = user.image;
            } else {
              token.image = null;
            }
          } catch (e) {
            token.role = isAdmin ? "admin" : "user";
            token.status = "active";
            token.username = user.name || email.split("@")[0];
            token.image = null;
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role || "user";
        (session.user as any).status = token.status || "active";
        (session.user as any).username = token.username || "User";
        if (token.image) {
          (session.user as any).image = token.image;
        }
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  secret: process.env.NEXTAUTH_SECRET || "badwadachoon-secret-key-1234567890-super-secure",
};
