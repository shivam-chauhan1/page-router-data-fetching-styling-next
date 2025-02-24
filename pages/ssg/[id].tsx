import { GetStaticPaths, GetStaticProps } from "next";
import ssgStyles from "@/styles/DynamicSSG.module.css";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface SSGProps {
  post: Post;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://dummyjson.com/posts/");
  const posts: Post[] = await res.json().then((data) => data.posts);

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<SSGProps> = async ({ params }) => {
  const { id } = params as { id: string };
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  const post: Post = await res.json();

  return {
    props: { post },
    revalidate: 10, // ISR every 10 seconds
  };
};

export default function DynamicSSG({ post }: SSGProps) {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className={`${ssgStyles.heading} text-2xl font-semibold mb-2`}>
        {post.title}
      </h1>
      <p className="text-gray-700">{post.body}</p>
    </div>
  );
}
