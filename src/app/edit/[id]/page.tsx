import EditTopicForm from "@/components/EditTopicForm";


interface Topic {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
}

interface Params {
  id: string;
}

const getTopicById = async (id: string): Promise<{ topic: Topic }> => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

interface EditTopicProps {
  params: Params;
}

export default async function EditTopic({ params }: EditTopicProps) {
  const { id } = params;
  const { topic } = await getTopicById(id);
  const { title, description, content, category } = topic;

  return <EditTopicForm id={id} title={title} description={description} content={content} category={category} />;
}
