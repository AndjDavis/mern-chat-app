import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

export function useAuth() {
	return useContext(UserContext);
}
