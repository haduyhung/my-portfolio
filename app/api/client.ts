import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./schema";

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    if (typeof window === "undefined") return request;
    const token =
      localStorage.getItem("jp_auth_token") ?? localStorage.getItem("admin_auth_token");
    if (token) request.headers.set("Authorization", `Bearer ${token}`);
    return request;
  },
};

export const api = createClient<paths>({ baseUrl });
api.use(authMiddleware);

export type { paths } from "./schema";
export type { components } from "./schema";
