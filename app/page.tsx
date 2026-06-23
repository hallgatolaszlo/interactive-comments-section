import { fetchComments, fetchUserById } from "@/app/lib/data";
import { ThreadedComment } from "@/app/lib/definitions";
import styles from "@/app/page.module.css";
import { CommentCard, CreateComment } from "@/app/ui/comments/comment";
import DeleteModal from "@/app/ui/comments/delete-modal";
import { Fragment } from "react/jsx-runtime";

// TODO:
// mobile styling
// accessibility improvements (aria-labels, keyboard navigation, etc.)

export default async function Page() {
	const comments = await fetchComments();
	const commentCards = await generateCommentCards({ comments });

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				{commentCards}
				<CreateComment />
				<DeleteModal />
			</main>
		</div>
	);
}

export async function generateCommentCards({
	comments,
}: {
	comments: ThreadedComment[];
}) {
	const commentCards = await Promise.all(
		comments.map(async (comment) => {
			const user = await fetchUserById(comment.userId);
			const replyCards = await Promise.all(
				// Create a CommentCard for each reply, fetching the user data for each reply
				comment.replies.map(async (reply) => {
					const replyUser = await fetchUserById(reply.userId);
					const repliesToUser = reply.repliesTo
						? await fetchUserById(reply.repliesTo)
						: undefined;
					return (
						<CommentCard
							key={reply.id}
							comment={reply}
							user={replyUser}
							repliesTo={repliesToUser} // Pass the user being replied to as a prop
						/>
					);
				}),
			);

			return (
				// Group the comment and its replies together
				<Fragment key={comment.id}>
					<CommentCard
						key={comment.id}
						comment={comment}
						user={user}
					/>
					{replyCards.length > 0 && (
						<div className={styles["reply-container"]}>
							<div className={styles["reply-line"]}></div>
							<div className={styles["reply-cards"]}>
								{replyCards}
							</div>
						</div>
					)}
				</Fragment>
			);
		}),
	);
	return commentCards;
}
