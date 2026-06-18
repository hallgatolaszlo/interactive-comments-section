import Image from "next/image";

export function ReplyIcon({ hover }: { hover?: boolean }) {
	return (
		<Image
			src={
				hover ? "/icons/icon-reply-hover.svg" : "/icons/icon-reply.svg"
			}
			alt="Reply icon"
			width={14}
			height={13}
		/>
	);
}

export function DeleteIcon({ hover }: { hover?: boolean }) {
	return (
		<Image
			src={
				hover
					? "/icons/icon-delete-hover.svg"
					: "/icons/icon-delete.svg"
			}
			alt="Delete icon"
			width={12}
			height={14}
		/>
	);
}

export function EditIcon({ hover }: { hover?: boolean }) {
	return (
		<Image
			src={hover ? "/icons/icon-edit-hover.svg" : "/icons/icon-edit.svg"}
			alt="Edit icon"
			width={14}
			height={14}
		/>
	);
}

export function PlusIcon({ hover }: { hover?: boolean }) {
	return (
		<Image
			src={hover ? "/icons/icon-plus-hover.svg" : "/icons/icon-plus.svg"}
			alt="Plus icon"
			width={11}
			height={11}
		/>
	);
}

export function MinusIcon({ hover }: { hover?: boolean }) {
	return (
		<Image
			src={
				hover ? "/icons/icon-minus-hover.svg" : "/icons/icon-minus.svg"
			}
			alt="Minus icon"
			width={11}
			height={3}
		/>
	);
}
