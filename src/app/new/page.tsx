"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleChange = (name: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleContentChange = (value: string) => {
    handleChange("content", value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, description, category, content } = formData;

    if (!title || !description || !category || !content) {
      setError("Title, description, category, and content are required.");
      return;
    }

    setLoading(true);
    setError("");

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
        // Reset form fields
        setFormData({
          title: "",
          description: "",
          category: "",
          content: "",
        });
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        name="title"
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        value={formData.title}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />

      <input
        name="description"
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        value={formData.description}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
      />

      <select
        name="category"
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        value={formData.category}
        className="border border-slate-500 px-8 py-2"
      >
        <option value="">Select Category</option>
        <option value="Technology">Technology</option>
        <option value="Science">Science</option>
        <option value="Art">Art</option>
      </select>

      <ReactQuill
        value={formData.content}
        onChange={handleContentChange}
        className="px-8 py-2"
        placeholder="Topic Content"
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="bg-yellow-500 hover:bg-yellow-600 text-black w-fit font-bold py-2 px-4 rounded"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
