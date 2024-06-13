// import { Hono } from "hono";
// import { verify } from "hono/jwt";
// import { JWTPayload } from "hono/utils/jwt/types";

// export const postRouter = new Hono<{
//   Bindings: {
//     DATABASE_URL: string;
//     JWT_SECRET: string;
//   };
//   Variables: {
//     userId: string;
//   };
// }>();

// export function initMiddleware(app: Hono) {
//   app.use("/api/v1/post/*", async (c, next) => {
//     const header = c.req.header("Authorization") || "";
//     // Bearer token => ["Bearer", "token"];
//     const token = header.split(" ")[1];

//     // @ts-ignore
//     const response: JWTPayload = await verify(token, c.env.JWT_SECRET);
//     if (response.id) {
//       next();
//     } else {
//       c.status(403);
//       return c.json({ error: "unauthorized" });
//     }
//   });
// }
