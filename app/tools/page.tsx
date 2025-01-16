import { Tool, tools } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const AllTools = () => {
  return (
    <div className="flex flex-col gap-4 p-5">
      <h1 className="text-2xl text-white font-bold">Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tools.map((tool, index) => (
          <ToolCard tool={tool} key={index} />
        ))}
      </div>
    </div>
  );
};

const ToolCard = ({ tool }: { tool: Tool }) => {
  return (
    <div className="flex border border-white/20 w-fit rounded-2xl flex-col gap-2 p-5">
      <tool.icon className="w-10 h-10 text-white" />
      <h1 className="text-2xl text-white font-bold">{tool.name}</h1>
      <p className="text-white/50">{tool.description}</p>
      <Link
        href={`/tools/${tool.slug}`}
        className="flex hover:bg-neutral-800 p-2 text-sm rounded-md w-fit items-center gap-2 text-blue-500"
      >
        Try Now <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default AllTools;
