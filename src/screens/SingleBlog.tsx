import { useParams } from "react-router-dom"

const SingleBlog = () => {

  const { blogId } = useParams()

  return (
    <div>{blogId}</div>
  )
}

export default SingleBlog