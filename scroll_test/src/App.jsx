import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [posts, setPosts] = useState([]);
  const containerRef = useRef(null);

  // Simulate fetching initial posts
  useEffect(() => {
    setPosts(Array.from({ length: 10 }, (_, i) => `Header ${i + 1}`));
  }, []);

  const fetchMorePosts = () => {
    const newPosts = Array.from(
      { length: 10 },
      (_, i) => `Header ${posts.length + i + 1}`
    );
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        fetchMorePosts();
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: "100vh", overflowY: "auto", padding: "10px" }}
    >
      {posts.map((post, index) => (
        <h1 key={index}>{post}</h1>
      ))}
    </div>
  );
};

export default App;
