import { VoteButton } from "@/app/ui/comments/button";
import styles from "@/app/ui/comments/styles/counter.module.css";

interface CounterProps {
	count: number;
	onUpvote: () => void;
	onDownvote: () => void;
}

export default function Counter({ count, onUpvote, onDownvote }: CounterProps) {
	return (
		<div className={styles["counter"]}>
			<VoteButton type="upvote" onClick={onUpvote} />
			<span className={`${styles["count"]} subtitle`}>{count}</span>
			<VoteButton type="downvote" onClick={onDownvote} />
		</div>
	);
}
