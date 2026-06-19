import { create } from "zustand";

interface CurrentUserState {
	userId: number;
	username: string;
	imageUrl: string;
}

export const useCurrentUserStore = create<CurrentUserState>((set) => ({
	userId: 4,
	username: "juliusomo",
	imageUrl: "/avatars/image-juliusomo.png",
}));
