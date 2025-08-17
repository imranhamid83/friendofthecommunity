"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Error loading blogs:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (loading) return <p className="p-6">Loading blogs...</p>;

  return (
    <div className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold mb-4">All Blogs</h1>

      {blogs.length === 0 && <p>No blogs found.</p>}

      <div className="grid gap-4">
        {blogs.map((blog) => (
          <Link key={blog.blogId} href={`/blogs/${blog.blogId}`}>
            <Card className="hover:shadow-lg transition cursor-pointer">
              <CardHeader>
                <CardTitle className="text-xl">{blog.title}</CardTitle>
                <p className="text-sm text-gray-500">
                  By {blog.authorId} on{" "}
                  {new Date(blog.createdDate).toLocaleDateString()}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 truncate">
                  {blog.content?.substring(0, 120) || "Read more..."}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
