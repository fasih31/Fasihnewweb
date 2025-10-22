import { useQuery } from "@tanstack/react-query";

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  isAdmin?: boolean;
}

export function useAuth() {
  const { data: user, isLoading, error } = useQuery<User>({
    queryKey: ["/api/auth/me"],
    retry: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user && !error,
    isAdmin: user?.isAdmin || false,
  };
}
