import Post from "./Post";
import "./posts.css";

const Posts = ({ posts }) => {
  return (
    <>
      <div className="posts">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((p) => (
            <Post key={p._id} post={p} />
          ))
        ) : (
          <p className="noPosts">No posts yet. Create your first post!</p>
        )}
      </div>
    </>
  );
};

export default Posts;
