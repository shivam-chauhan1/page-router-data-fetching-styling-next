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
    <div className="p-4 hover:bg-gray-100 focus:bg-gray-200 transition-shadow shadow-md hover:shadow-lg">
      <h1 className={ssrStyles.heading}>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
