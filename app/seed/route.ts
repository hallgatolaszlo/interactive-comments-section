import { comments, users } from "@/app/seed/seed-data";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, {
	ssl: "require",
	transform: postgres.camel,
	prepare: false,
});

async function seedUsers() {
	await sql`
        CREATE TABLE IF NOT EXISTS Users (
            id SERIAL PRIMARY KEY,
            username TEXT NOT NULL,
            image_url TEXT NOT NULL
        );
    `;

	const insertedUsers = await Promise.all(
		users.map(
			(user) =>
				sql`INSERT INTO Users (id, username, image_url)
                VALUES (${user.id}, ${user.username}, ${user.imageUrl})
                ON CONFLICT (id) DO NOTHING;`,
		),
	);

	return insertedUsers;
}

async function seedComments() {
	await sql`
        CREATE TABLE IF NOT EXISTS Comments (
            id SERIAL PRIMARY KEY,
            content TEXT NOT NULL,
            created_at TIMESTAMP NOT NULL,
            score INT NOT NULL,
            user_id INT,
            replies_to INT,
            CONSTRAINT fk_user FOREIGN KEY(user_id)
            REFERENCES Users(id),
            CONSTRAINT fk_replies_to FOREIGN KEY(replies_to)
            REFERENCES Comments(id)
        );
    `;

	const insertedComments = await Promise.all(
		comments.map(
			(comment) =>
				sql`INSERT INTO Comments (id, content, created_at, score, user_id, replies_to)
                VALUES (${comment.id}, ${comment.content}, ${comment.createdAt}, ${comment.score}, ${comment.userId}, ${comment.repliesTo})
                ON CONFLICT (id) DO NOTHING;`,
		),
	);

	return insertedComments;
}

export async function GET() {
	// DROP TABLES AND SEED DATA
	//
	// await sql`DROP TABLE IF EXISTS Comments`;
	// await sql`DROP TABLE IF EXISTS Users`;
	// return Response.json({ message: "Database reset successfully" });
	//
	// SEED DATA
	//
	// try {
	// 	const result = await sql.begin((sql) => [seedUsers(), seedComments()]);
	// 	return Response.json({ message: "Database seeded successfully" });
	// } catch (error) {
	// 	return Response.json({ error }, { status: 500 });
	// }
}
