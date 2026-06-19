"use client";

export default function Error() {
	return (
		<div className="error-container">
			<h1 className="error-title">Oops! Something went wrong.</h1>
			<p className="error-message">
				We encountered an unexpected error. Please try again later.
			</p>
		</div>
	);
}
