"use client";

import { Button, IconButton } from "@/app/ui/comments/button";
import Counter from "@/app/ui/comments/counter";
import styles from "@/app/ui/comments/styles/comment.module.css";
import Image from "next/image";
import { useState } from "react";

// TODO: Add functionality to:
// create comment
// reply to comment
// delete comment
// up/downvote comment

export function Comment() {
	const [voteCount, setVoteCount] = useState(0);
	const imageUrl = "/avatars/image-amyrobson.png";
	const username = "amyrobson";
	const date = "1 month ago";
	const content =
		"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.";

	function handleUpvote() {
		setVoteCount(voteCount + 1);
	}

	function handleDownvote() {
		setVoteCount(voteCount - 1);
	}

	return (
		<article className={styles.comment}>
			<Counter
				count={voteCount}
				onUpvote={handleUpvote}
				onDownvote={handleDownvote}
			/>
			<div className={styles["comment-section"]}>
				<div className={styles["comment-header-container"]}>
					<header className={styles["comment-header"]}>
						<figure className={styles["comment-avatar"]}>
							<Image
								width={32}
								height={32}
								src={imageUrl}
								alt="User avatar"
							/>
						</figure>
						<h3 className={`subtitle`}>{username}</h3>
						<p className={`body ${styles["grey-text"]}`}>{date}</p>
					</header>
					<IconButton type="reply" onClick={() => {}} />
				</div>
				<section>
					<p className={`body ${styles["grey-text"]}`}>{content}</p>
				</section>
			</div>
		</article>
	);
}

export function CreateComment() {
	const imageUrl = "/avatars/image-amyrobson.png";

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
				placeholder="Add a comment..."
			/>
			<Button label="Send" />
		</form>
	);
}

export function CommentReply() {
	const imageUrl = "/avatars/image-amyrobson.png";
	const username = "amyrobson";

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
