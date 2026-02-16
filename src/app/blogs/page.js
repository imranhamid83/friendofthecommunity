"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toSlug } from "@/lib/utils";

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">All Blogs</h1>

      {blogs.length === 0 && <p>No blogs found.</p>}

      <div className="grid gap-4 sm:gap-6 grid-cols-1">
        {blogs.map((blog) => (
          <Link key={blog.blogId} href={`/blogs/${toSlug(blog.title)}`}>
            <Card className="hover:shadow-lg transition cursor-pointer">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl break-words">{blog.title}</CardTitle>
                <p className="text-xs sm:text-sm text-gray-500">
                  By {blog.authorId} on{" "}
                  {new Date(blog.createdDate).toLocaleDateString()}
                </p>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <p className="text-sm text-gray-700 line-clamp-2">
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
