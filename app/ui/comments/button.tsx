"use client";

import {
	DeleteIcon,
	EditIcon,
	MinusIcon,
	PlusIcon,
	ReplyIcon,
} from "@/app/ui/comments/icons";
import styles from "@/app/ui/comments/styles/button.module.css";
import { useState } from "react";

interface ButtonProps {
	label?: string;
	onClick?: () => void;
	type?: "generic" | "delete" | "cancel";
}

interface IconButtonProps {
	onClick?: () => void;
	type: "reply" | "delete" | "edit";
}

interface VoteButtonProps {
	onClick?: () => void;
	type?: "upvote" | "downvote";
}

export function Button({ label, onClick, type = "generic" }: ButtonProps) {
	return (
		<button
			className={`${styles["button"]} subtitle ${type === "delete" ? styles["delete-button"] : type === "cancel" ? styles["cancel-button"] : ""}`}
			onClick={onClick}
		>
			{label}
		</button>
	);
}

export function IconButton({ onClick, type }: IconButtonProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<button
			className={`${styles["button-with-icon"]} ${styles[type === "delete" ? "pink-button" : "purple-button"]} subtitle`}
			onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className={styles["button-content"]}>
				{type === "reply" && <ReplyIcon hover={isHovered} />}
				{type === "delete" && <DeleteIcon hover={isHovered} />}
				{type === "edit" && <EditIcon hover={isHovered} />}
				{type === "reply" && <span>Reply</span>}
				{type === "delete" && <span>Delete</span>}
				{type === "edit" && <span>Edit</span>}
			</div>
		</button>
	);
}

export function VoteButton({ onClick, type }: VoteButtonProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<button
			className={`${styles["vote-button"]} purple-button`}
			onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{type === "upvote" ? (
				<PlusIcon hover={isHovered} />
			) : (
				<MinusIcon hover={isHovered} />
			)}
		</button>
	);
}
