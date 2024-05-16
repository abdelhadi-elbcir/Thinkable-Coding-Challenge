"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface TopicFormData {
  title: string;
  description: string;
  category: string;
  content: string;
}

export default function AddTopic() {
  const [formData, setFormData] = useState<TopicFormData>({
    title: "",
    description: "",
    category: "",
    content: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, description, category, content } = formData;

    if (!title || !description || !category || !content) {
      alert("Title, description, category, and content are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description, category, content }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        name="title"
        onChange={handleChange}
        value={formData.title}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />

      <input
        name="description"
        onChange={handleChange}
        value={formData.description}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
      />

      <select
        name="category"
        onChange={handleChange}
        value={formData.category}
        className="border border-slate-500 px-8 py-2"
      >
        <option value="">Select Category</option>
        <option value="Technology">Technology</option>
        <option value="Science">Science</option>
        <option value="Art">Art</option>
      </select>

      <textarea
        name="content"
        onChange={handleChange}
        value={formData.content}
        className="border border-slate-500 px-8 py-2"
        placeholder="Topic Content"
      />

      <button
        type="submit"
        className="bg-yellow-500 hover:bg-yellow-600 text-black w-fit font-bold py-2 px-4 rounded"
      >
        Save
      </button>
    </form>
  );
}