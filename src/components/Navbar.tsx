import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-slate-800 px-8 py-3">
      <Link className="text-white font-bold" href={"/"}>
        EL BCIR <sup>BLOG</sup>
      </Link>
      <Link className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded" href={"/new"}>
        New Post
      </Link>
    </nav>
  );
}
