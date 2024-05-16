"use client";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { useState, useEffect } from "react";
interface Topic {
  _id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  createdAt:string
}

const getTopics = async (): Promise<{ topics: Topic[] }> => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    
    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
    return { topics: [] };
  }
};

export default function TopicsList() {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const { topics } = await getTopics();
      setTopics(topics.reverse());
      console.log(topics.reverse());
    };

    fetchTopics();
  }, []);

  return (
    <div className="grid gap-4">
      {topics.map((t) => (
        <div
          key={t._id}
          className="p-4 bg-white border border-gray-300 rounded-lg shadow-md"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">{t.title}</h2>
            <div className="text-gray-500 text-sm">Date: {t.createdAt.substring(0, 10)}</div>
          </div>
          <div className="text-gray-700">{t.description}</div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">Category: {t.category}</div>
            <div className="flex gap-2">
              <RemoveBtn id={t._id} />
              <Link href={`/edit/${t._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}