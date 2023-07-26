import { LoaderArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPost } from "~/models/post.server";

export const loader = async ({ params }: LoaderArgs) => {
  const { slug } = params;
  const post = slug ? await getPost(slug) : null;

  return json({ post });
};

export default function Posts() {
  const { post } = useLoaderData<typeof loader>();

  if (!post) {
    return (
      <main className="mx-auto max-w-4xl">
        <h1 className="my-6 text-center text-3xl">
          Not found
        </h1>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">
        {post.title}
      </h1>
    </main>
  );
}
