import { NextResponse } from "next/server";
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

export async function GET(req, { params }) {
  try {
    const { slug } = await params;

    // Scan all blogs and find the one matching the slug
    const command = new ScanCommand({
      TableName: "Blogs",
    });

    const data = await ddbDocClient.send(command);
    const blog = data.Items?.find(item => toSlug(item.title) === slug);

    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog", details: error.message },
      { status: 500 }
    );
  }
}

