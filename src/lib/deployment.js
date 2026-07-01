import packageJson from "../../package.json";

export function getDeploymentInfo() {
  const deploymentVersion =
    process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? packageJson.version;

  const buildTime = process.env.BUILD_TIME;
  const deploymentDate = buildTime
    ? new Date(buildTime).toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Europe/London",
      })
    : "Local development";

  return { deploymentDate, deploymentVersion };
}
