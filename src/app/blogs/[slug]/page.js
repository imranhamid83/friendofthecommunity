import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { toSlug } from "@/lib/utils";

const client = new DynamoDBClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

const ddbDocClient = DynamoDBDocumentClient.from(client);

async function getBlogBySlug(slug) {
  try {
    const command = new ScanCommand({
      TableName: "Blogs",
    });
    const data = await ddbDocClient.send(command);
    return data.Items?.find(item => toSlug(item.title) === slug) || null;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  return {
    title: blog ? `${blog.title} | Muslims in Amersham & Chalfont` : "Blog Not Found",
    description: blog ? blog.content?.substring(0, 160) : "Blog not found",
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

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
          <p className="text-base leading-relaxed whitespace-pre-line">{blog.content}</p>

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
