export function isLoggedIn(): boolean {
	return sessionStorage.getItem("loggedIn") === "true";
}

export function login() {
	sessionStorage.setItem("loggedIn", "true");
}

export function logout() {
	sessionStorage.removeItem("loggedIn");
}
