import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import {NextRequest, NextResponse } from "next/server";

interface TopicData {
  title: string;
  description: string;
  category: string;
  content: string;
}

export async function POST(request: { json: () => Promise<TopicData> }) {
  const { title, description, category, content } = await request.json();
  await connectMongoDB();

  try {
    const newTopic = new Topic({
      title,
      description,
      category,
      content,
    });
    await newTopic.save();
    return NextResponse.json({ message: "Topic Created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating topic:", error);
    return NextResponse.json(
      { message: "Error creating topic" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  await connectMongoDB();
  
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '3', 10);
  const skip = (page - 1) * limit;

  const total = await Topic.countDocuments();
  const topics = await Topic.find().skip(skip).limit(limit);

  return NextResponse.json({ topics, total, page, pages: Math.ceil(total / limit) });
}

export async function DELETE(request: { nextUrl: URL }) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}
