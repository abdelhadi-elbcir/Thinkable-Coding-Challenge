import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";


export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { newTitle, newDescription, newContent, newCategory } = await request.json();

  await connectMongoDB();

  await Topic.findByIdAndUpdate(id, {
    title: newTitle,
    description: newDescription,
    content: newContent,
    category: newCategory,
  });

  return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  await connectMongoDB();

  const topic = await Topic.findById(id);

  if (!topic) {
    return NextResponse.json({ error: "Topic not found" }, { status: 404 });
  }

  return NextResponse.json({ topic }, { status: 200 });
}