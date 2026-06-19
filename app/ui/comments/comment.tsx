"use client";

import { createComment, State } from "@/app/lib/actions";
import { createTimestampFromDate } from "@/app/lib/comment-utils";
import { Comment, User } from "@/app/lib/definitions";
import { useCurrentUserStore } from "@/app/stores/useCurrentUserStore";
import { useDeleteModalStore } from "@/app/stores/useDeleteModalStore";
import { Button, IconButton } from "@/app/ui/comments/button";
import Counter from "@/app/ui/comments/counter";
import styles from "@/app/ui/comments/styles/comment.module.css";
import Image from "next/image";
import { useActionState } from "react";

// TODO: Add functionality to:
// reply to comment
// up/downvote comment (also save all votes of a user in a separate table to prevent multiple votes and delete score)

// Component for displaying a single comment or reply
export function CommentCard({
	comment,
	user,
	repliesTo,
}: {
	comment: Comment;
	user: User;
	repliesTo?: User;
}) {
	const { userId } = useCurrentUserStore();

	return (
		<article className={`${styles.comment}`}>
			<Counter
				count={comment.score}
				onUpvote={() => {}}
				onDownvote={() => {}}
			/>
			<div className={styles["comment-section"]}>
				<div className={styles["comment-header-container"]}>
					<header className={styles["comment-header"]}>
						<figure className={styles["comment-avatar"]}>
							<Image
								width={32}
								height={32}
								src={user.imageUrl}
								alt="User avatar"
							/>
						</figure>
						<h3 className={`subtitle`}>{user.username}</h3>
						<p className={`body ${styles["grey-text"]}`}>
							{createTimestampFromDate(comment.createdAt)}
						</p>
					</header>
					<div className={styles["comment-actions"]}>
						<IconButton type="reply" onClick={() => {}} />
						{userId === comment.userId && (
							<IconButton
								type="delete"
								onClick={() => {
									useDeleteModalStore.setState({
										isOpen: true,
										commentId: comment.id,
									});
								}}
							/>
						)}
					</div>
				</div>
				<section>
					<p className={`body ${styles["grey-text"]}`}>
						{repliesTo && (
							<span
								className={`${styles["replying-to"]} subtitle`}
							>
								@{repliesTo.username}{" "}
							</span>
						)}
						{comment.content}
					</p>
				</section>
			</div>
		</article>
	);
}

// Form for creating a new comment
export function CreateComment() {
	const { imageUrl, userId } = useCurrentUserStore();
	const initialState: State = { message: null, errors: {} };
	const createCommentWithUserId = createComment.bind(null, userId);
	const [state, formAction] = useActionState(
		createCommentWithUserId,
		initialState,
	);

	return (
		<form action={formAction} className={styles.comment}>
			<figure className={styles["create-comment-avatar"]}>
				<Image
					width={40}
					height={40}
					src={imageUrl}
					alt="User avatar"
				/>
			</figure>
			<textarea
				id="content"
				name="content"
				className={`${styles["comment-textarea"]} body`}
				placeholder="Add a comment..."
			/>
			<Button label="Send" />
		</form>
	);
}

// Form for replying to a comment
export function ReplyToComment() {
	const { username, imageUrl } = useCurrentUserStore();

	return (
		<form className={styles.comment}>
			<figure className={styles["create-comment-avatar"]}>
				<Image
					width={40}
					height={40}
					src={imageUrl}
					alt="User avatar"
				/>
			</figure>
			<textarea
				className={`${styles["comment-textarea"]} body`}
				defaultValue={`@${username}`}
			/>
			<Button label="Reply" />
		</form>
	);
}
