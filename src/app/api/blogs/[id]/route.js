import { NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

// Initialize DynamoDB client
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
    const blogId = parseInt(params.id, 10);

    const command = new GetCommand({
      TableName: "Blogs",
      Key: {
        blogId: blogId, // Partition key
      },
    });

    const data = await ddbDocClient.send(command);

    if (!data.Item) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data.Item);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog", details: error.message },
      { status: 500 }
    );
  }
}
