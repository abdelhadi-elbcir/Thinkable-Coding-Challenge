"use client";
import { useEffect, useState } from "react";
import sanitizeHtml from "sanitize-html";

interface Topic {
  _id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  date: string;
  createdAt: string;
}

interface GetTopicDetailsResponse {
  topic: Topic;
}

const getTopicDetails = async (
  topicId: string
): Promise<GetTopicDetailsResponse | null> => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${topicId}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topic details");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading topic details: ", error);
    return null;
  }
};

const showDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [topic, setTopic] = useState<Topic | null>(null);

  useEffect(() => {
    const fetchTopicDetails = async () => {
      if (id) {
        const topicDetails = await getTopicDetails(id);
        if (topicDetails?.topic) {
          setTopic(topicDetails.topic);
        }
      }
    };
    fetchTopicDetails();
  }, [id]);

  if (!topic) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{topic.title}</h1>
      <div className="mb-4">
        <span className="font-semibold">Category:</span> {topic.category}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Created at:</span>{" "}
        {new Date(topic.createdAt).toLocaleDateString()}
      </div>
      <div
        className="mb-4"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(topic.content)
        }}
      ></div>
    </div>
  );
};

export default showDetails;
