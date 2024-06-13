import { Hono } from "hono";
import { cors } from "hono/cors";
import { userRouter } from "./routes/userRoute";
import { postRouter } from "./routes/postRoute";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

const allowedOrigins = ["http://127.0.0.1:8787"];

app.use("/*", cors());

app.route("/api/v1/user", userRouter);
app.route("/api/v1/post", postRouter);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
