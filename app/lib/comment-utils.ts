import { ThreadedComment } from "@/app/lib/definitions";

export function createTimestampFromDate(date: Date): string {
	const now = new Date().getTime();
	const createdAt = new Date(date).getTime();
	const diffInSeconds = Math.floor((now - createdAt) / 1000);

	if (diffInSeconds < 60) {
		return `${diffInSeconds} seconds ago`;
	}
	if (diffInSeconds < 3600) {
		return `${Math.floor(diffInSeconds / 60)} minutes ago`;
	}
	if (diffInSeconds < 86400) {
		return `${Math.floor(diffInSeconds / 3600)} hours ago`;
	}
	if (diffInSeconds < 604800) {
		return `${Math.floor(diffInSeconds / 86400)} days ago`;
	}
	if (diffInSeconds < 2592000) {
		return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
	}
	if (diffInSeconds < 31536000) {
		return `${Math.floor(diffInSeconds / 2592000)} months ago`;
	}
	return `${Math.floor(diffInSeconds / 31536000)} years ago`;
}

export function sortCommentsByScore(
	comments: ThreadedComment[],
): ThreadedComment[] {
	comments.sort((a, b) => b.score - a.score);
	comments.forEach((comment) => {
		comment.replies.sort((a, b) => b.score - a.score);
	});
	return comments;
}
