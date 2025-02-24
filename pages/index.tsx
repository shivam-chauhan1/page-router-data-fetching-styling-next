import Link from "next/link";
import homeStyles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <h1 className={homeStyles.heading}>Next.js Data Fetching Examples</h1>
      <ul>
        <li>
          <Link href="/client">Client-side Fetching (SWR)</Link>
        </li>
        <li>
          <Link href="/ssr/1">Server-side Fetching (getServerSideProps)</Link>
        </li>
        <li>
          <Link href="/ssg/1">
            Static Site Generation (getStaticProps & ISR)
          </Link>
        </li>
      </ul>
    </div>
  );
}
