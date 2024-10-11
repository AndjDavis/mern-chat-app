import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

export function useGetUser() {
	return useContext(UserContext);
}

export function useAuth() {
	return useContext(UserContext);
}
