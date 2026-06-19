"use client";

import { deleteComment } from "@/app/lib/actions";
import { useDeleteModalStore } from "@/app/stores/useDeleteModalStore";
import { Button } from "@/app/ui/comments/button";
import styles from "@/app/ui/comments/styles/delete-modal.module.css";

export default function DeleteModal() {
	const { isOpen, commentId } = useDeleteModalStore();

	if (!isOpen) {
		return null;
	}

	return (
		<div className={`${styles["delete-modal"]}`}>
			<div className={`${styles["delete-card"]}`}>
				<h2 className={`header ${styles["delete-card-header"]}`}>
					Delete Comment
				</h2>
				<p className={`body ${styles["delete-card-body"]}`}>
					{
						"Are you sure you want to delete this comment? This will remove the comment and can't be undone."
					}
				</p>
				<div className={`${styles["delete-card-buttons"]}`}>
					<Button
						type="cancel"
						label="No, Cancel"
						onClick={() => {
							useDeleteModalStore.setState({
								isOpen: false,
								commentId: null,
							});
						}}
					/>
					<Button
						type="delete"
						label="Yes, Delete"
						onClick={() => {
							if (commentId !== null) {
								deleteComment(commentId); // Call the deleteComment function with the commentId
							}
							useDeleteModalStore.setState({
								isOpen: false,
								commentId: null,
							});
						}}
					/>
				</div>
			</div>
		</div>
	);
}
