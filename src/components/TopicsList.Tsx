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
  createdAt: string;
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
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTopics = async () => {
      const { topics } = await getTopics();
      setTopics(topics.reverse());
    };
    fetchTopics();
  }, []);

  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Search By Title"
          value={searchTerm}
          style={{margin:"10px" , padding:"5px"}}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="grid gap-6">
          {filteredTopics.map((t) => (
            <div
              key={t._id}
              style={{margin:"10px" , padding:"5px"}}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {t.title}
                </h2>
                <div className="text-gray-500 text-sm">
                  {new Date(t.createdAt).toLocaleDateString()}
                </div>
              </div>
              <p className="text-gray-700 mb-4">{t.description}</p>
              <div className="text-sm text-gray-500 mb-4">
                Category: {t.category}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <RemoveBtn id={t._id} />
                  <Link href={`/edit/${t._id}`}>
                    <HiPencilAlt
                      size={24}
                      className="text-blue-500 cursor-pointer hover:text-blue-700 transition-colors duration-300"
                    />
                  </Link>
                </div>
                <Link href={`/feed/${t._id}`}>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-md shadow-sm transition-transform transform hover:scale-105">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}