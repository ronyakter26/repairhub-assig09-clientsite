
import dns from "node:dns";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

// Fix MongoDB DNS issue
dns.setServers(["8.8.8.8", "8.8.4.4"]);
console.log("Better Auth DNS:", dns.getServers());
const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: ["customer", "technician"],
        required: true,
        input: true,
      },
      phone: {
        type: "string",
        required: true,
        input: true,
      },
      area: {
        type: "string",
        required: true,
        input: true,
      },
      bio: {
        type: "string",
        required: false,
        input: false,
      },
    },
  },

    account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },
    socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  plugins: [jwt()],
});
