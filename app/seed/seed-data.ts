export const users = [
	{
		id: 1,
		username: "amyrobson",
		imageUrl: "/avatars/image-amyrobson.png",
	},
	{
		id: 2,
		username: "maxblagun",
		imageUrl: "/avatars/image-maxblagun.png",
	},
	{
		id: 3,
		username: "ramsesmiron",
		imageUrl: "/avatars/image-ramsesmiron.png",
	},
	{
		id: 4,
		username: "juliusomo",
		imageUrl: "/avatars/image-juliusomo.png",
	},
];

export const comments = [
	{
		id: 1,
		content:
			"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
		createdAt: "2025-03-25T11:32:51Z",
		score: 12,
		userId: 1,
		repliesTo: null,
	},
	{
		id: 2,
		content:
			"Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
		createdAt: "2025-08-01T09:15:30Z",
		score: 5,
		userId: 2,
		repliesTo: null,
	},
	{
		id: 3,
		content:
			"If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
		createdAt: "2026-06-01T14:20:00Z",
		score: 4,
		userId: 3,
		repliesTo: 2,
	},
	{
		id: 4,
		content:
			"I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
		createdAt: "2026-06-19T10:45:00Z",
		score: 2,
		userId: 4,
		repliesTo: 2,
	},
	{
		id: 5,
		content:
			"Thanks for the advice! I'll definitely focus on the fundamentals before diving into React. I appreciate the insight!",
		createdAt: "2026-06-19T12:45:00Z",
		score: 1,
		userId: 2,
		repliesTo: 3,
	},
];
