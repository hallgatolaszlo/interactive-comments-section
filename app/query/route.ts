import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, {
	ssl: "require",
	transform: postgres.camel,
	prepare: false,
});

async function listComments() {
	return await sql`SELECT * FROM Comments`;
}

async function listUsers() {
	return await sql`SELECT * FROM Users`;
}

export async function GET() {
	try {
		const comments = await listComments();
		const users = await listUsers();
		return Response.json({ comments, users });
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}
