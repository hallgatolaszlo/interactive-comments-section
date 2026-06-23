import { create } from "zustand";

interface ReplyHandlerState {
	isOpen: boolean;
	commentId: number | null;
	username: string | null;
	setIsOpen: (isOpen: boolean) => void;
	setCommentId: (commentId: number | null) => void;
	setUsername: (username: string | null) => void;
}

export const useReplyHandlerStore = create<ReplyHandlerState>((set) => ({
	isOpen: false,
	commentId: null,
	username: null,
	setIsOpen: (isOpen) => set({ isOpen }),
	setCommentId: (commentId) => set({ commentId }),
	setUsername: (username) => set({ username }),
}));
