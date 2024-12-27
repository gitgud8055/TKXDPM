import * as React from "react";
import { useNavigate } from "react-router-dom";
/**
 * Internal utility for demos
 * @ignore - internal component.
 */

const DUMMY_BASE = "https://example.com";

/**
 * Hook to create a router for demos.
 * @returns An in-memory router To be used in demos demos.
 */
export function useRouter(initialUrl = "/") {
  const [url, setUrl] = React.useState(() => new URL(initialUrl, DUMMY_BASE));
  const navigate = useNavigate();
  const router = React.useMemo(() => {
    return {
      pathname: url.pathname,
      searchParams: url.searchParams,
      navigate: (newUrl) => {
        const nextUrl = new URL(newUrl, DUMMY_BASE);
        if (
          nextUrl.pathname !== url.pathname ||
          nextUrl.search !== url.search
        ) {
          setUrl(nextUrl);
          navigate(nextUrl.pathname);
        }
      },
    };
  }, [url.pathname, url.search, url.searchParams, navigate]);
  return router;
}
