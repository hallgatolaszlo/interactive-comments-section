export type User = {
	id: number;
	username: string;
	imageUrl: string;
};

export type Comment = {
	id: number;
	content: string;
	createdAt: Date;
	score: number;
	userId: number;
	repliesTo: number | null;
};

export type ThreadedComment = Comment & {
	replies: ThreadedComment[];
};

export type CreateCommentFormData = {
	content: string;
};
