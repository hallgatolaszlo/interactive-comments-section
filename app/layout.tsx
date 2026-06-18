import { rubik } from "@/app/ui/fonts";
import "@app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Interactive Comments Section",
	description:
		"A simple interactive comments section built with Next.js for a Frontend Mentor challenge.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={` ${rubik.className} antialiased`}>
			<body>{children}</body>
		</html>
	);
}
