"use client";

import {
	createComment,
	replyToComment,
	State,
	updateComment,
	updateCommentScore,
} from "@/app/lib/actions";
import { createTimestampFromDate } from "@/app/lib/comment-utils";
import { BREAKPOINTS } from "@/app/lib/constants";
import { Comment, User } from "@/app/lib/definitions";
import { useCurrentUserStore } from "@/app/stores/useCurrentUserStore";
import { useDeleteModalStore } from "@/app/stores/useDeleteModalStore";
import { useReplyHandlerStore } from "@/app/stores/useReplyHandler";
import { Button, IconButton } from "@/app/ui/comments/button";
import Counter from "@/app/ui/comments/counter";
import styles from "@/app/ui/comments/styles/comment.module.css";
import Image from "next/image";
import { useActionState, useState } from "react";
import useBreakpoint from "use-breakpoint";

export function CommentCounter({ comment }: { comment: Comment }) {
	return (
		<Counter
			count={comment.score}
			onUpvote={() => {
				updateCommentScore(comment.id, comment.score + 1);
			}}
			onDownvote={() => {
				updateCommentScore(comment.id, comment.score - 1);
			}}
		/>
	);
}

export function CommentActions({
	comment,
	user,
	isEditing,
	setIsEditing,
}: {
	comment: Comment;
	user: User;
	isEditing: boolean;
	setIsEditing: (isEditing: boolean) => void;
}) {
	const { breakpoint } = useBreakpoint(BREAKPOINTS, "desktop");
	const { userId } = useCurrentUserStore();
	const {
		commentId: replyCommentId,
		setIsOpen: setReplyModalOpen,
		setCommentId: setReplyCommentId,
		setUsername,
	} = useReplyHandlerStore();
	const { setIsOpen: setDeleteModalOpen, setCommentId: setDeleteCommentId } =
		useDeleteModalStore();

	return (
		<div
			className={`${styles["comment-actions"]} ${breakpoint === "mobile" ? styles["comment-actions-mobile"] : ""}`}
		>
			{userId !== comment.userId && (
				<IconButton
					type="reply"
					onClick={() => {
						if (replyCommentId === comment.id) {
							setReplyModalOpen(false);
							setReplyCommentId(null);
							setUsername(null);
							return;
						}

						setReplyModalOpen(true);
						setReplyCommentId(comment.id);
						setUsername(user.username);
					}}
				/>
			)}
			{userId === comment.userId && (
				<IconButton
					type="delete"
					onClick={() => {
						setDeleteModalOpen(true);
						setDeleteCommentId(comment.id);
					}}
				/>
			)}
			{userId === comment.userId && (
				<IconButton
					type="edit"
					onClick={() => setIsEditing(!isEditing)}
				/>
			)}
		</div>
	);
}

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
	const { breakpoint } = useBreakpoint(BREAKPOINTS, "desktop");
	const { userId } = useCurrentUserStore();
	const { isOpen: isReplyModalOpen, commentId: replyCommentId } =
		useReplyHandlerStore();

	const [isEditing, setIsEditing] = useState(false);
	const initialState: State = { message: null, errors: {} };
	const updateCommentWithUserId = updateComment.bind(null, comment.id);
	const [state, formAction] = useActionState(
		updateCommentWithUserId,
		initialState,
	);

	return (
		<>
			<article
				className={`${styles.comment} ${breakpoint === "mobile" ? styles["mobile-comment"] : ""}`}
			>
				{breakpoint !== "mobile" && (
					<CommentCounter comment={comment} />
				)}
				<div className={styles["comment-section"]}>
					<div className={styles["comment-header-container"]}>
						<header className={styles["comment-header"]}>
							<figure className={styles["comment-avatar"]}>
								<Image
									width={32}
									height={32}
									src={user.imageUrl}
									alt={`${user.username}'s avatar`}
								/>
							</figure>
							<div className={styles["comment-username"]}>
								<h3 className={`subtitle`}>{user.username}</h3>
								{userId === comment.userId && (
									<span
										className={`${styles["you-label"]} caption`}
									>
										you
									</span>
								)}
							</div>
							<p className={`body ${styles["grey-text"]}`}>
								{createTimestampFromDate(comment.createdAt)}
							</p>
						</header>
						{breakpoint !== "mobile" && (
							<CommentActions
								comment={comment}
								user={user}
								isEditing={isEditing}
								setIsEditing={setIsEditing}
							/>
						)}
					</div>
					<section>
						{!isEditing && (
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
						)}
						{isEditing && (
							<form
								onSubmit={() => {
									setIsEditing(false);
								}}
								action={formAction}
								className={styles["comment-edit"]}
							>
								<textarea
									id="content"
									name="content"
									className={`${styles["comment-textarea"]} body`}
									defaultValue={comment.content}
									aria-label="Edit comment content"
								/>
								<Button label="Update" />
							</form>
						)}
					</section>
				</div>
				{breakpoint === "mobile" && (
					<div className={styles["comment-actions-mobile-container"]}>
						<CommentCounter comment={comment} />
						<CommentActions
							comment={comment}
							user={user}
							isEditing={isEditing}
							setIsEditing={setIsEditing}
						/>
					</div>
				)}
			</article>
			{isReplyModalOpen && replyCommentId === comment.id && (
				<ReplyToComment />
			)}
		</>
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
				aria-label="Add a comment"
			/>
			<Button label="Send" />
		</form>
	);
}

// Form for replying to a comment
export function ReplyToComment() {
	const { imageUrl, userId } = useCurrentUserStore();
	const { username, commentId, setCommentId } = useReplyHandlerStore();
	const initialState: State = { message: null, errors: {} };
	const replyToCommentWithUserId = replyToComment.bind(
		null,
		commentId!,
		userId,
	);
	const [state, formAction] = useActionState(
		replyToCommentWithUserId,
		initialState,
	);

	return (
		<form
			onSubmit={() => {
				setCommentId(null);
			}}
			action={formAction}
			className={styles.comment}
		>
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
				defaultValue={`@${username}`}
				aria-label={`Replying to ${username}`}
			/>
			<Button label="Reply" />
		</form>
	);
}
