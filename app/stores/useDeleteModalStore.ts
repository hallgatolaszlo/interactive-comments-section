import { create } from "zustand";

interface DeleteModalState {
	isOpen: boolean;
	commentId: number | null;
}

export const useDeleteModalStore = create<DeleteModalState>((set) => ({
	isOpen: false,
	commentId: null,
}));
