import { Link } from "react-router-dom";

interface BlogCardProps {
  imageSource?: string;
  topic?: string;
  blogTitle?: string;
  blogUpdateDate?: string
}

const BlogCard: React.FC<BlogCardProps> = ({
  imageSource,
  topic,
  blogTitle,
}) => {
  return (
    <Link to="" className="w-80 mx-4 mb-10 scale-95 hover:scale-100">
      <img className="rounded-2xl w-full h-48" src={imageSource} alt="" />
      <div className="px-3">
        <div className="text-sm pt-4 text-gray-500 flex justify-between items-center mt-2">
          <p> {topic}</p>
          <div>
            <i className="text-sm fa-solid fa-calendar-days"></i>
            <span className="pl-2 text-sm">2 Jan 2024</span>
          </div>
        </div>
        <p className="pt-2 text-blue-900 font-semibold">{blogTitle}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
