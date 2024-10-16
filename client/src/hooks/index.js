import AuthContainer from "../providers/AuthContainer";

export function useAuth() {
	const { isAuthenticated, isLoading, signOut, signIn, register } =
		AuthContainer.useContainer();
	return { isAuthenticated, isLoading, signOut, signIn, register };
}

export function useUser() {
	const { user } = AuthContainer.useContainer();
	return { user };
}

export const useIsAuthenticated = () => {
	const { isAuthenticated } = AuthContainer.useContainer();
	return { isAuthenticated };
}
