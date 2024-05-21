import { Link } from "react-router-dom";
import { BlogCard } from "../../components";

const BlogSection = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <div className="flex items-center justify-center">
          <img className="w-24 h-24" src="writer3.jpg" alt="" />
          <p className="ml-6 text-4xl font-semibold">Blogs</p>
        </div>

        <div className="text-center px-10 sm:px-28 py-10">
          <p>
            Dive into the succinct tech explorations, where I unravel the latest
            trends, share coding escapades, and demystify the ever-evolving tech
            landscape. From lines of code to cutting-edge advancements, let's
            navigate the future together. You can have a visit to my{" "}
            <Link to="blogs" className="text-blue-600 font-semibold">
              Blogs
            </Link>{" "}
            page to read all my blogs, where I have many interesting articles to
            read.
          </p>
        </div>

        <div className="flex items-center justify-center flex-wrap py-3">
          <BlogCard
            imageSource="https://img.freepik.com/free-photo/kid-with-vr-glasses-experiencing-metaverse_23-2150904776.jpg?t=st=1704102493~exp=1704106093~hmac=bc4542a363c728e463f6909fad7ec276010b90bd96177015f6139a9fadd0fbd3&w=1380"
            topic="Gaming"
            blogTitle="this is a random test string this is a random test string this is a random test string"
          />
          <BlogCard
            imageSource="https://img.freepik.com/free-photo/kid-with-vr-glasses-experiencing-metaverse_23-2150904776.jpg?t=st=1704102493~exp=1704106093~hmac=bc4542a363c728e463f6909fad7ec276010b90bd96177015f6139a9fadd0fbd3&w=1380"
            topic="Gaming"
            blogTitle="this is a random test string this is a random test string this is a random test string"
          />
          <BlogCard
            imageSource="https://img.freepik.com/free-photo/kid-with-vr-glasses-experiencing-metaverse_23-2150904776.jpg?t=st=1704102493~exp=1704106093~hmac=bc4542a363c728e463f6909fad7ec276010b90bd96177015f6139a9fadd0fbd3&w=1380"
            topic="Gaming"
            blogTitle="this is a random test string this is a random test string this is a random test string"
          />
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
