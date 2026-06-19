"use server";

import { revalidatePath } from "next/cache";
import postgres from "postgres";
import z from "zod";

const sql = postgres(process.env.POSTGRES_URL!, {
	ssl: "require",
	transform: postgres.camel,
	prepare: false,
});

const FormSchema = z.object({
	id: z.number(),
	content: z.string().min(1, "Content is required"),
	createdAt: z.date(),
	score: z.number(),
	userId: z.number(),
	repliesTo: z.number().nullable(),
});

const CreateCommentSchema = FormSchema.pick({
	content: true,
});

export type State = {
	message?: string | null;
	errors?: Record<string, string[]>;
};

export async function createComment(
	userId: number,
	prevState: State,
	formData: FormData,
): Promise<State> {
	const validatedFields = CreateCommentSchema.safeParse({
		content: formData.get("content"),
	});

	if (!validatedFields.success) {
		return {
			message: "Invalid comment content",
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const { content } = validatedFields.data;
	const createdAt = new Date(); // New comments are created with the current timestamp
	const score = 0; // New comments start with a score of 0
	const repliesTo = null; // New comments are top-level comments, so repliesTo is null

	try {
		await sql`
        INSERT INTO Comments (content, created_at, score, user_id, replies_to)
        VALUES (${content}, ${createdAt}, ${score}, ${userId}, ${repliesTo})
        `;
	} catch (error) {
		return {
			message: "Failed to create comment",
			errors: {
				database: ["An error occurred while saving the comment"],
			},
		};
	}

	revalidatePath("/"); // Revalidate the path to update the comments list
	return { message: null, errors: {} };
}

export async function deleteComment(commentId: number): Promise<State> {
	try {
		await sql`
        DELETE FROM Comments WHERE id = ${commentId}
        `;
	} catch (error) {
		return {
			message: "Failed to delete comment",
			errors: {
				database: ["An error occurred while deleting the comment"],
			},
		};
	}
	revalidatePath("/"); // Revalidate the path to update the comments list
	return { message: null, errors: {} };
}
