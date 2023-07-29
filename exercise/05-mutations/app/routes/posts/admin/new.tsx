import { Form, useActionData } from "@remix-run/react";
import { ActionArgs, json, redirect } from "@remix-run/node";
import { createPost } from "~/models/post.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  if (typeof title !== "string" || !title) {
    return json({ title: "Title is required" });
  }

  if (typeof slug !== "string" || !slug) {
    return json({ slug: "Slug is required" });
  }

  if (typeof markdown !== "string" || !markdown) {
    return json({ markdown: "Markdown is required" });
  }

  const post = await createPost({ title, slug, markdown });

  return redirect(`/posts/${post.slug}`);
}

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export default function NewPost() {
  const errors = useActionData<typeof action>();
  
  return (
    <Form method="post">
      <p>
        <label>
          Post Title:{" "}
          <input type="text" name="title" className={inputClassName} />
          {errors && "title" in errors && (<em className="text-red-600">{errors.title}</em>)}
        </label>
      </p>
      <p>
        <label>
          Post Slug:{" "}
          <input type="text" name="slug" className={inputClassName} />
          {errors && "slug" in errors && (<em className="text-red-600">{errors.slug}</em>)}
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown: </label>
        <br />
        <textarea
          id="markdown"
          rows={8}
          name="markdown"
          className={`${inputClassName} font-mono`}
        />
        {errors && "markdown" in errors && (<em className="text-red-600">{errors.markdown}</em>)}
      </p>
      <p className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          Create Post
        </button>
      </p>
    </Form>
  );
}
