import { tools } from "@/lib/data";
import Link from "next/link";

const AllTools = () => {
  return (
    <div className="">
      <h1 className="text-2xl text-black font-bold mb-4">Tools</h1>
      {tools.map((tool, index) => (
        <Link
          href={`/tools/${tool.slug}`}
          className="text-blue-500 underline"
          key={index}
        >
          {index + 1}. {tool.name}
        </Link>
      ))}
    </div>
  );
};

export default AllTools;
