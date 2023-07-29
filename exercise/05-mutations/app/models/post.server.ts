import { prisma } from "~/db.server";

export async function getPostListItems() {
  return prisma.post.findMany({ select: { slug: true, title: true } });
}

export async function getPost(slug: string) {
  return prisma.post.findUnique({ where: { slug } });
}

type PostCreateInput = {
  title: string,
  slug: string,
  markdown: string
}

export async function createPost(post: PostCreateInput) {
  return prisma.post.create({ data: post });
}
