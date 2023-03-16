import { Octokit } from "@octokit/rest";

interface Event {
  name: string;
}

export async function main(event: Event) {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN is not set");
  }

  if (!process.env.GITHUB_OWNER) {
    throw new Error("GITHUB_OWNER is not set");
  }

  if (!process.env.GITHUB_REPOSITORY) {
    throw new Error("GITHUB_REPOSITORY is not set");
  }

  if (!process.env.GITHUB_WORKFLOW) {
    throw new Error("GITHUB_WORKFLOW is not set");
  }

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  await octokit.request(
    "POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches",
    {
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPOSITORY,
      workflow_id: process.env.GITHUB_WORKFLOW,
      ref: "dispatch",
      inputs: {
        name: event.name,
      },
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
}
