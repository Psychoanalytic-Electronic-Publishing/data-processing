import { App } from "octokit";

interface Event {
  inputs: { [key: string]: string };
  workflow: string;
}

const getEnv = (name: string) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
};

export async function main(event: Event) {
  const privateKey = Buffer.from(
    getEnv("GITHUB_PRIVATE_KEY"),
    "base64"
  ).toString();

  const app = new App({
    appId: getEnv("GITHUB_APP_ID"),
    privateKey: privateKey,
  });

  const octokit = await app.getInstallationOctokit(
    parseInt(getEnv("GITHUB_INSTALLATION_ID"))
  );

  await octokit.request(
    "POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches",
    {
      owner: getEnv("GITHUB_OWNER"),
      repo: getEnv("GITHUB_REPOSITORY"),
      workflow_id: event.workflow,
      ref: "main",
      inputs: event.inputs,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
}
