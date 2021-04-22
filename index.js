import { useQuery } from "react-query"
import { useRouter } from "next/router"

async function fetchSession() {
  const res = await fetch("/api/auth/session")
  const session = await res.json()
  return Object.keys(session).length > 0 ? session : null
}

export function useSession({
  required,
  redirectTo = "/api/auth/signin?error=SessionExpired",
  queryConfig,
} = {}) {
  const router = useRouter()
  const query = useQuery(["session"], fetchSession, {
    onSettled(data) {
      if (data || !required) return
      router.push(redirectTo)
    },
    ...queryConfig,
  })
  return [query.data, query.status === "loading"]
}
