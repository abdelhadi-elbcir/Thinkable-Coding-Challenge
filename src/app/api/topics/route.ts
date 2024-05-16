import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

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

export async function GET() {
  await connectMongoDB();
  const topics = await Topic.find();
  return NextResponse.json({ topics });
}

export async function DELETE(request: { nextUrl: URL }) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}
