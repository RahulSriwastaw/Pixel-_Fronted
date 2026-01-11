import { z } from "zod";

// === ENTITY INTERFACES ===

export interface User {
    id: number;
    username: string;
    email: string;
    password?: string;
    name: string;
    role: string | null;
    createdAt: string | Date | null;
}

export interface Creator {
    id: number;
    userId: number;
    bio: string;
    profileImage: string;
    rating: string | null;
    totalOrders: number | null;
}

export interface Design {
    id: number;
    creatorId: number;
    title: string;
    description: string;
    price: string;
    deliveryTimeHours: number;
    category: string;
    image: string;
    rating: string | null;
    likes: number | null;
    ordersCount: number | null;
    badge: string | null;
    createdAt: string | Date | null;
}

export interface Order {
    id: number;
    designId: number;
    userId: number;
    status: string | null;
    instructions: string | null;
    logoUrl: string | null;
    referenceImages: string[] | null;
    preferredColors: string[] | null;
    useOfficialColors: boolean | null;
    createdAt: string | Date | null;
}

export interface Review {
    id: number;
    designId: number;
    userId: number;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string | Date | null;
}

// === ZOD SCHEMAS ===

export const insertUserSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    name: z.string().min(1, "Name is required"),
    role: z.string().default("customer"),
});

export const insertCreatorSchema = z.object({
    userId: z.number(),
    bio: z.string().min(1, "Bio is required"),
    profileImage: z.string().url("Invalid URL"),
    rating: z.string().default("0.0"),
    totalOrders: z.number().default(0),
});

export const insertDesignSchema = z.object({
    creatorId: z.number(),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
    deliveryTimeHours: z.number().int().positive(),
    category: z.string().min(1, "Category is required"),
    image: z.string().url("Invalid image URL"),
    rating: z.string().default("0.0"),
    likes: z.number().default(0),
    ordersCount: z.number().default(0),
    badge: z.string().nullable().optional(),
});

export const insertOrderSchema = z.object({
    designId: z.number(),
    userId: z.number(),
    status: z.string().default("pending"),
    instructions: z.string().optional(),
    logoUrl: z.string().url().optional().nullable(),
    referenceImages: z.array(z.string()).optional().nullable(),
    preferredColors: z.array(z.string()).optional().nullable(),
    useOfficialColors: z.boolean().default(false),
});

export const insertReviewSchema = z.object({
    designId: z.number(),
    userId: z.number(),
    userName: z.string(),
    rating: z.number().min(1).max(5),
    comment: z.string().min(1, "Comment is required"),
});

// === EXTENDED TYPES ===

export type DesignWithCreator = Design & { creator: Creator & { user: User } };

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertDesign = z.infer<typeof insertDesignSchema>;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type InsertReview = z.infer<typeof insertReviewSchema>;
