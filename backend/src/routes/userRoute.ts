import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { SignUpInput, LoginInput } from "@ayush_srivastava/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const zodResult = SignUpInput.safeParse(body);

  if (!zodResult.success) {
    c.status(400);
    return c.json({ message: "Invalid input" });
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (userExists) {
    return c.json({ message: "User already exists" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    const token = await sign(
      { id: user.id, exp: Math.floor((Date.now() + 30 * 60 * 1000) / 1000) },
      c.env?.JWT_SECRET
    );

    c.header("Authorization", `Bearer ${token}`);

    return c.json({ token: token, message: "User created successfully" });
  } catch (e) {
    console.error(e);
    return c.json({ error: "Error creating user" });
  }
});

userRouter.post("/login", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const zodResult = LoginInput.safeParse(body);

  if (!zodResult.success) {
    c.status(400);
    return c.json({ message: "Invalid input" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "User not found" });
    }

    if (user.password !== body.password) {
      return c.json({ error: "Invalid credentials" });
    }

    const token = await sign(
      { id: user.id, exp: Math.floor((Date.now() + 30 * 60 * 1000) / 1000) },
      c.env?.JWT_SECRET
    );

    c.header("Authorization", `Bearer ${token}`);

    return c.json({ token: token, message: "Login successful" });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Error logging in" });
  }
});
