import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { POST, GET, DELETE } from "../app/api/topics/route";

jest.mock("@/libs/mongodb");
jest.mock("@/models/topic");

describe("API Tests", () => {
  beforeAll(() => {
    (connectMongoDB as jest.Mock).mockImplementation(() => Promise.resolve());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/topics", () => {
    it("should create a new topic", async () => {
      const requestBody = {
        title: "Test Title",
        description: "Test Description",
        category: "Test Category",
        content: "Test Content",
      };

      (Topic as any).mockImplementation(() => ({
        save: jest.fn().mockResolvedValueOnce({}),
      }));

      const request = {
        json: () => Promise.resolve(requestBody),
      };

      const response = await POST(request as any);
      expect(response.status).toBe(201);
      expect(response.json()).resolves.toEqual({ message: "Topic Created" });
    });

    it("should handle errors", async () => {
      const requestBody = {
        title: "Test Title",
        description: "Test Description",
        category: "Test Category",
        content: "Test Content",
      };

      (Topic as any).mockImplementation(() => ({
        save: jest.fn().mockRejectedValueOnce(new Error("Failed to save")),
      }));

      const request = {
        json: () => Promise.resolve(requestBody),
      };

      const response = await POST(request as any);
      expect(response.status).toBe(500);
      expect(response.json()).resolves.toEqual({
        message: "Error creating topic",
      });
    });
  });

  describe("GET /api/topics", () => {
    it("should retrieve topics", async () => {
      const topics = [
        {
          title: "Topic 1",
          description: "Description 1",
          category: "Category 1",
          content: "Content 1",
        },
        {
          title: "Topic 2",
          description: "Description 2",
          category: "Category 2",
          content: "Content 2",
        },
      ];

      (Topic.find as jest.Mock).mockResolvedValueOnce(topics);

      const response = await GET();
      expect(response.status).toBe(200);
      expect(response.json()).resolves.toEqual({ topics });
    });
  });

  describe("DELETE /api/topics", () => {
    it("should delete a topic", async () => {
      const request = {
        nextUrl: { searchParams: new URLSearchParams("id=12345") },
      };

      (Topic.findByIdAndDelete as jest.Mock).mockResolvedValueOnce({});

      const response = await DELETE(request as any);
      expect(response.status).toBe(200);
      expect(response.json()).resolves.toEqual({ message: "Topic deleted" });
    });
  });

});
