"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = params.id;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blogs/${blogId}`);
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error("Error loading blog:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [blogId]);

  if (loading) return <p className="p-6">Loading blog...</p>;
  if (!blog || !blog.blogId) return <p className="p-6">Blog not found.</p>;

  return (
    <div className="p-6 flex justify-center">
      <Card className="max-w-3xl w-full rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{blog.title}</CardTitle>
          <p className="text-sm text-gray-500">
            By {blog.authorId} on {new Date(blog.createdDate).toLocaleDateString()}
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed">{blog.content}</p>

          {blog.tags && (
            <div className="mt-4 flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-200 rounded-full text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {blog.views && (
            <p className="mt-4 text-sm text-gray-600">👁 {blog.views} views</p>
          )}

          {blog.comments && blog.comments.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Comments</h3>
              <ul className="space-y-3">
                {blog.comments.map((c) => (
                  <li
                    key={c.commentId}
                    className="p-3 border rounded-lg bg-gray-50 shadow-sm"
                  >
                    <p className="text-sm">
                      <strong>{c.author}</strong>: {c.text}
                    </p>
                    <span className="text-xs text-gray-400">
                      {new Date(c.date).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
