"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface EditTopicFormProps {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
}

export default function EditTopicForm({ id, title, description, content, category }: EditTopicFormProps) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newContent, setNewContent] = useState(content);
  const [newCategory, setNewCategory] = useState(category);

  const router = useRouter();

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription, newContent, newCategory }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />

      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
      />

      <textarea
        onChange={(e) => setNewContent(e.target.value)}
        value={newContent}
        className="border border-slate-500 px-8 py-2"
        placeholder="Topic Content"
      />

      <input
        onChange={(e) => setNewCategory(e.target.value)}
        value={newCategory}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Category"
      />

      <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded">
        Save Modification
      </button>
    </form>
  );
}