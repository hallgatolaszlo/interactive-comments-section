import { Button } from "@/app/ui/comments/button";
import styles from "@/app/ui/comments/styles/delete-card.module.css";

// TODO: Add functionality to delete comment

export default function DeleteCard() {
	return (
		<div className={`${styles["delete-card"]}`}>
			<h2 className={`header ${styles["card-header"]}`}>
				Delete Comment
			</h2>
			<p className={`body ${styles["card-body"]}`}>
				{
					"Are you sure you want to delete this comment? This will remove the comment and can't be undone."
				}
			</p>
			<div className={`${styles["delete-card-buttons"]}`}>
				<Button type="cancel" label="No, Cancel" />
				<Button type="delete" label="Yes, Delete" />
			</div>
		</div>
	);
}
