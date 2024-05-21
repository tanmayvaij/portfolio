import { BlogCard } from "../components";

const data = [
  {
    blogId: "id1",
    imageSource:
      "https://img.freepik.com/free-photo/kid-with-vr-glasses-experiencing-metaverse_23-2150904776.jpg?t=st=1704102493~exp=1704106093~hmac=bc4542a363c728e463f6909fad7ec276010b90bd96177015f6139a9fadd0fbd3&w=1380",
    topic: "Gaming",
    blogTitle:
      "this is a random test string this is a random test string this is a random test string",
    blogContent:
      "this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string",
  },
  {
    blogId: "id2",
    imageSource:
      "https://img.freepik.com/free-photo/generative-ai-tank-goes-down-city-street_1268-22203.jpg?t=st=1704105094~exp=1704108694~hmac=cae9961f0560f2a6b5ce6e011e3f42af4561df627366d2af9c77b686d715033a&w=1380",
    topic: "Gaming",
    blogTitle:
      "this is a random test string this is a random test string this is a random test string",
    blogContent:
      "this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string",
  },
  {
    blogId: "id3",
    imageSource:
      "https://img.freepik.com/free-photo/scifi-mech-soldier-black-background_587448-4747.jpg?t=st=1704105176~exp=1704108776~hmac=49b7b55cbf0eedf19673e83a799e132077cb06849a3c81385dc15a0ef148614a&w=1380",
    topic: "Gaming",
    blogTitle:
      "this is a random test string this is a random test string this is a random test string",
    blogContent:
      "this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string",
  },
  {
    blogId: "id4",
    imageSource:
      "https://img.freepik.com/free-photo/automobile-racing-sports-competition_23-2150799991.jpg?t=st=1704105286~exp=1704108886~hmac=ea9d11a20c5d915edd89e7da8bb046537922835f955437ccdfee67930f68478d&w=1380",
    topic: "Gaming",
    blogTitle:
      "this is a random test string this is a random test string this is a random test string",
    blogContent:
      "this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string",
  },
  {
    blogId: "id5",
    imageSource:
      "https://img.freepik.com/free-photo/close-up-athlete-playing-soccer_23-2150845598.jpg?t=st=1704104721~exp=1704108321~hmac=89f3eb147268fccb71509e69b1f96e968a12bc5e9107006304930aa388e082b5&w=1380",
    topic: "Gaming",
    blogTitle:
      "this is a random test string this is a random test string this is a random test string",
    blogContent:
      "this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string",
  },
  {
    blogId: "id6",
    imageSource:
      "https://img.freepik.com/free-photo/men-women-hiking-mountain-peak-sunset-generated-by-ai_188544-40109.jpg?t=st=1704105394~exp=1704108994~hmac=88c7374669671430db828d557355dd7aa664728b41cba49a8aa3139102e7388f&w=1380",
    topic: "Gaming",
    blogTitle:
      "this is a random test string this is a random test string this is a random test string",
    blogContent:
      "this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string",
  },
  {
    blogId: "id7",
    imageSource:
      "https://img.freepik.com/free-photo/futuristic-representation-fast-water-vehicle_23-2151048092.jpg",
    topic: "Gaming",
    blogTitle:
      "this is a random test string this is a random test string this is a random test string",
    blogContent:
      "this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string",
  },
  {
    blogId: "id8",
    imageSource:
      "https://img.freepik.com/free-photo/tranquil-scene-flowing-water-green-trees-fog-wilderness-area-generated-by-artificial-intellingence_25030-62537.jpg?t=st=1704105563~exp=1704109163~hmac=a0655447189084f4c32821c73023cc6552c22de1940f0b774f6bc8f98436e6b4&w=1380",
    topic: "Gaming",
    blogTitle:
      "this is a random test string this is a random test string this is a random test string",
    blogContent:
      "this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string this is a random test string",
  }
];

const Blogs = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-65px)] sm:min-h-[calc(100vh-88px)] pt-5">
      <div className="flex flex-wrap items-center justify-center">
        {data.map((props, index) => (
          <BlogCard key={index} {...props} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
