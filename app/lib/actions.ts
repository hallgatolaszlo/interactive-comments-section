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
const ReplyToCommentSchema = FormSchema.pick({
	content: true,
});
const UpdateCommentSchema = FormSchema.pick({
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
	const createdAt = new Date().toUTCString(); // New comments are created with the current timestamp
	const score = 0; // New comments start with a score of 0
	const repliesTo = null; // New comments are top-level comments, so repliesTo is null

	try {
		await sql`
        INSERT INTO Comments (content, created_at, score, user_id, replies_to)
        VALUES (${content}, ${createdAt}, ${score}, ${userId}, ${repliesTo})
        `;
	} catch {
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

export async function replyToComment(
	commentId: number,
	userId: number,
	prevState: State,
	formData: FormData,
): Promise<State> {
	const validatedFields = ReplyToCommentSchema.safeParse({
		content: formData.get("content"),
	});

	if (!validatedFields.success) {
		return {
			message: "Invalid reply content",
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const { content } = validatedFields.data;
	const createdAt = new Date(); // New comments are created with the current timestamp
	const score = 0; // New comments start with a score of 0
	const repliesTo = commentId; // Replying to an existing comment, so set repliesTo to the ID of the comment being replied to

	try {
		await sql`
        INSERT INTO Comments (content, created_at, score, user_id, replies_to)
        VALUES (${content}, ${createdAt}, ${score}, ${userId}, ${repliesTo})
        `;
	} catch {
		return {
			message: "Failed to create reply",
			errors: {
				database: ["An error occurred while saving the comment"],
			},
		};
	}

	revalidatePath("/"); // Revalidate the path to update the comments list
	return { message: null, errors: {} };
}

export async function updateComment(
	commentId: number,
	prevState: State,
	formData: FormData,
): Promise<State> {
	const validatedFields = UpdateCommentSchema.safeParse({
		content: formData.get("content"),
	});

	if (!validatedFields.success) {
		return {
			message: "Invalid comment content",
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const { content } = validatedFields.data;

	try {
		await sql`
        UPDATE Comments
        SET content = ${content}
        WHERE id = ${commentId}
        `;
	} catch {
		return {
			message: "Failed to update comment",
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
	} catch {
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

export async function updateCommentScore(
	commentId: number,
	newScore: number,
): Promise<State> {
	try {
		await sql`
		UPDATE Comments
		SET score = ${newScore}
		WHERE id = ${commentId}
		`;
	} catch {
		return {
			message: "Failed to update comment score",
			errors: {
				database: [
					"An error occurred while updating the comment score",
				],
			},
		};
	}
	revalidatePath("/"); // Revalidate the path to update the comments list
	return { message: null, errors: {} };
}
