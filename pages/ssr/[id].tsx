import { GetServerSideProps } from "next";
import ssrStyles from "@/styles/DynamicSSR.module.css";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface SSRProps {
  post: Post;
}

export const getServerSideProps: GetServerSideProps<SSRProps> = async (
  context
) => {
  const { id } = context.params as { id: string };
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  const post: Post = await res.json();

  return {
    props: { post },
  };
};

export default function DynamicSSR({ post }: SSRProps) {
  return (
    <div className="p-6 bg-white shadow-md hover:shadow-lg rounded-lg transition-shadow">
      <h1 className={`${ssrStyles.heading} text-xl font-bold mb-2`}>
        {post.title}
      </h1>
      <p className="text-gray-700">{post.body}</p>
    </div>
  );
}
