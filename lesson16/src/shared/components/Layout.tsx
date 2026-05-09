import { NavLink, Outlet } from "react-router-dom";
import { Show, SignInButton, SignOutButton, SignUpButton, UserButton } from "@clerk/react";

function navClassName({ isActive }: { isActive: boolean }) {
	return [
		"rounded-md px-3 py-2 text-sm font-medium transition-colors",
		isActive
			? "bg-primary text-primary-foreground"
			: "text-muted-foreground hover:bg-muted hover:text-foreground",
	].join(" ");
}

export function Layout() {
	return (
		<div className="bg-background min-h-screen">
			<header className="border-border bg-card/50 border-b backdrop-blur-sm">
				<div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
					<p className="text-foreground text-sm font-semibold tracking-tight">
						Lesson 16
					</p>
					<nav className="flex flex-wrap gap-2" aria-label="Main navigation">
						<NavLink to="/" end className={navClassName}>
							Home
						</NavLink>
						<NavLink to="/about" className={navClassName}>
							About
						</NavLink>
						<NavLink to="/dashboard" className={navClassName}>
							Dashboard
						</NavLink>
						<Show when="signed-out">
							<SignInButton />
							<SignUpButton />
						</Show>
						<Show when="signed-in">
							<UserButton />
							<SignOutButton>
								<button className="cursor-pointer transition-transform hover:scale-110 flex flex-col items-center">
									<div className="w-3 h-4 bg-black rounded-full" />
									<div className="w-6 h-5 bg-black rounded-full -mt-1" />
									<div className="w-9 h-5 bg-black rounded-full -mt-1 flex items-center justify-center">
										<span className="text-white text-[7px] font-bold">Sign</span>
									</div>
									<div className="w-12 h-5 bg-black rounded-full -mt-1 flex items-center justify-center">
										<span className="text-white text-[7px] font-bold">out</span>
									</div>
								</button>
							</SignOutButton>
						</Show>
					</nav>
				</div>
			</header>
			<main className="mx-auto w-full max-w-6xl px-4 py-8">
				<Outlet />
			</main>
		</div>
	);
}
