import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextRequest, NextResponse } from 'next/server';
import { POST, GET, DELETE } from "../app/api/topics/route";
import { PUT } from "@/app/api/topics/[id]/route";

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
    beforeAll(() => {
      (connectMongoDB as jest.Mock).mockResolvedValueOnce({});
    });
  
    it("should retrieve topics with pagination", async () => {
      const topics = [
        {
          _id: "1",
          title: "Topic 1",
          description: "Description 1",
          category: "Category 1",
          content: "Content 1",
          createdAt: new Date().toISOString(),
        },
        {
          _id: "2",
          title: "Topic 2",
          description: "Description 2",
          category: "Category 2",
          content: "Content 2",
          createdAt: new Date().toISOString(),
        },
      ];
  
      const mockCountDocuments = jest.fn().mockResolvedValueOnce(2);
      const mockFind = jest.fn().mockReturnValueOnce({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValueOnce(topics),
      });
  
      (Topic.countDocuments as jest.Mock) = mockCountDocuments;
      (Topic.find as jest.Mock) = mockFind;
  
      const url = new URL('http://localhost/api/topics?page=1&limit=10');
      const request = new NextRequest(url.toString());
  
      const response = await GET(request);
  
      expect(response.status).toBe(200);
      await expect(response.json()).resolves.toEqual({
        topics,
        total: 2,
        page: 1,
        pages: 1,
      });
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

  describe("PUT /api/topics/:id", () => {
    it("should update a topic", async () => {
      const request = {
        json: () =>
          Promise.resolve({
            newTitle: "Updated Title",
            newDescription: "Updated Description",
            newContent: "Updated Content",
            newCategory: "Updated Category",
          }),
      } as any;
      const params = { id: "12345" };

      (Topic.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce({});

      const response = await PUT(request, { params });
      expect(response.status).toBe(200);
      expect(response.json()).resolves.toEqual({ message: "Topic updated" });
    });
  });

});
