interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedAt: string;
}

const BlogCard = ({
  authorName,
  title,
  content,
  publishedAt,
}: BlogCardProps) => {
  return (
    <div className="border-b-2 bg-gray-200 mx-10 my-4 rounded-lg py-4">
      <div className="flex gap-2 items-center px-5 pt-4">
        <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {authorName[0].toUpperCase()}
          </span>
        </div>
        {authorName} . {publishedAt}
      </div>
      <div className="py-5 px-5">
        <p className="font-bold">{title}</p>
        <p className="text-gray-600">{content.slice(0, 100) + "..."}</p>
      </div>
      <div className="flex gap-2 px-5 pb-4">
        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
          {`${Math.ceil(content.length / 100)} min read`}
        </span>
        <button className="bg-gray-600 text-white px-2 rounded-md hover:bg-gray-800 flex">
          <div className="self-center">Read More</div>
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
