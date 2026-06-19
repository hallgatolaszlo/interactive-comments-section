import { sortCommentsByScore } from "@/app/lib/comment-utils";
import { ThreadedComment, User } from "@/app/lib/definitions";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, {
	ssl: "require",
	transform: postgres.camel,
	prepare: false,
});

export async function fetchComments() {
	try {
		// Fetch comments and their replies from the database
		// Thread comments are fetched with their replies aggregated into a JSON array
		const comments = await sql<ThreadedComment[]>`
            WITH RECURSIVE CommentTree AS (
                SELECT 
                    id as top_level_id,
                    id, content, created_at, score, user_id, replies_to
                FROM Comments
                WHERE replies_to IS NULL

                UNION ALL

                SELECT
                    ct.top_level_id,
                    c.id, c.content, c.created_at, c.score, c.user_id, c.replies_to
                FROM Comments c
                JOIN CommentTree ct ON c.replies_to = ct.id
            )
            SELECT
                p.*,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'id', r.id,
                            'content', r.content,
                            'createdAt', r.created_at,
                            'score', r.score,
                            'userId', r.user_id,
                            'repliesTo', r.replies_to,
                            'replies', '[]'::json
                        )
                    ) FILTER (WHERE r.id IS NOT NULL),
                    '[]'::json
                ) as replies
            FROM Comments p
            LEFT JOIN CommentTree r ON r.top_level_id = p.id AND r.id != p.id
            WHERE p.replies_to IS NULL
            GROUP BY p.id
        `;

		sortCommentsByScore(comments);
		return comments;
	} catch (error) {
		console.error("Error fetching comments:", error);
		throw new Error("Failed to fetch comments");
	}
}

export async function fetchUserById(userId: number) {
	try {
		const user = await sql<User[]>`
            SELECT * FROM Users WHERE id = ${userId}
        `;
		return user[0];
	} catch (error) {
		console.error("Error fetching user:", error);
		throw new Error("Failed to fetch user");
	}
}
