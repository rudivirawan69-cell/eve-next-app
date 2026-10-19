import type { NextConfig } from "next";
import { withEve } from "eve/next";

const nextConfig: NextConfig = {
  // Keep config minimal so withEve can inject routes/services cleanly.
};

export default withEve(nextConfig);
