import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import {
  createPostInput,
  updatePostInput,
} from "@ayush_srivastava/medium-common";

export const postRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Middleware for authentication
postRouter.use("/*", async (c, next) => {
  const token = c.req.header("Authorization");

  const authHeader = token ? token.split(" ")[1] : null;

  if (!authHeader) {
    c.status(401);
    return c.json({ error: "Token not found!" });
  }

  try {
    const user = await verify(authHeader, c.env?.JWT_SECRET);

    if (user && typeof user.id === "string") {
      c.set("userId", user.id);
      await next(); // Call next middleware/handler
    } else {
      c.status(401);

      return c.json({ error: "Unauthorized" });
    }
  } catch (error) {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }
});

postRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const authorId = c.get("userId");

  const zodResult = createPostInput.safeParse(body);

  if (!zodResult.success) {
    c.status(400);
    return c.json({ message: "Invalid input" });
  }

  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
      },
    });

    c.status(201);
    return c.json({ message: "Post created successfully", id: post.id });
  } catch (error) {
    c.status(500);
    c.json({ error: "Error creating Post" });
  }
});

postRouter.put("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const authorId = c.get("userId");
  const postId = c.req.param("id");

  const zodResult = updatePostInput.safeParse(body);

  if (!zodResult.success) {
    c.status(400);
    return c.json({ message: "Invalid input" });
  }

  try {
    const post = await prisma.post.update({
      where: {
        id: postId,
        authorId: authorId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    c.status(200);
    return c.json({ message: "Post updated successfully", id: post.id });
  } catch (error) {
    c.status(500);
    c.json({ error: "Error updating Post" });
  }
});

postRouter.get("/bulk/:limit/:page", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const limit = parseInt(c.req.param("limit")) || 10;
    const page = parseInt(c.req.param("page")) || 1;

    const skip = (page - 1) * limit;

    const posts = await prisma.post.findMany({
      skip: skip,
      take: limit,
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    c.status(200);
    return c.json(posts);
  } catch (error) {
    c.status(500);
    c.json({ error: "Error fetching Posts" });
  }
});

postRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    c.status(200);
    return c.json(post);
  } catch (error) {
    c.status(500);
    c.json({ error: "Error fetching Post" });
  }
});
