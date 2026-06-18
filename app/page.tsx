import styles from "@/app/page.module.css";
import {
	Comment,
	CommentReply,
	CreateComment,
} from "@/app/ui/comments/comment";

export default function Page() {
	return (
		<div className={styles.container}>
			<main>
				<Comment />
				<CreateComment />
				<CommentReply />
			</main>
		</div>
	);
}
