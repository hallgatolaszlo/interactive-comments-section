"use client";

import { BREAKPOINTS } from "@/app/lib/constants";
import { VoteButton } from "@/app/ui/comments/button";
import styles from "@/app/ui/comments/styles/counter.module.css";
import useBreakpoint from "use-breakpoint";

interface CounterProps {
	count: number;
	onUpvote: () => void;
	onDownvote: () => void;
}

export default function Counter({ count, onUpvote, onDownvote }: CounterProps) {
	const { breakpoint } = useBreakpoint(BREAKPOINTS);

	return (
		<div
			className={
				breakpoint === "mobile"
					? styles["counter-mobile"]
					: styles["counter"]
			}
		>
			<VoteButton type="upvote" onClick={onUpvote} />
			<span className={`${styles["count"]} subtitle`}>{count}</span>
			<VoteButton type="downvote" onClick={onDownvote} />
		</div>
	);
}
