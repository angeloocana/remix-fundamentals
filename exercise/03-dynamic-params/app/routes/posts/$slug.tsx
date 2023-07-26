import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPost } from "~/models/post.server";
import { marked } from "marked";
import invariant from 'tiny-invariant';

export const loader = async ({ params }: LoaderArgs) => {
  const { slug } = params;

  invariant(slug, 'Post not found');

  const post = await getPost(slug);

  return json({ post });
};

export default function Posts() {
  const { post } = useLoaderData<typeof loader>();

  invariant(post, 'Post not found');

  const html = marked(post.markdown);

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">
        {post.title}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
