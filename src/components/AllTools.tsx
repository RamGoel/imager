import { tools } from "../lib/data";

const AllTools = () => {
  return (
    <div className=" p-6">
      <h1 className="text-2xl font-bold mb-4">Tools</h1>
      {tools.map((tool, index) => (
        <a href={`/tool/${tool.slug}`} className="text-blue-500 underline">
          {index + 1}. {tool.name}
        </a>
      ))}
    </div>
  );
};

export default AllTools;
