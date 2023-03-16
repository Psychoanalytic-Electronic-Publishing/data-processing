import { main } from ".";
import { Octokit, App } from "./__mocks__/octokit";

const app = new App();
const octokit = new Octokit();

describe("dispatch", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    process.env.GITHUB_PRIVATE_KEY = "cHJpdmF0ZS1rZXk";
    process.env.GITHUB_APP_ID = "123";
    process.env.GITHUB_INSTALLATION_ID = "456";
    process.env.GITHUB_OWNER = "octocat";
    process.env.GITHUB_REPOSITORY = "hello-world";
  });

  it("dispatches a workflow", async () => {
    const event = {
      workflow: "test.yml",
      inputs: {
        name: "Jordan",
      },
    };

    await main(event);

    expect(octokit.request).toHaveBeenCalledWith(
      "POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches",
      {
        headers: { "X-GitHub-Api-Version": "2022-11-28" },
        inputs: event.inputs,
        owner: process.env.GITHUB_OWNER,
        ref: "main",
        repo: process.env.GITHUB_REPOSITORY,
        workflow_id: event.workflow,
      }
    );

    expect(app.getInstallationOctokit).toHaveBeenCalledWith(
      parseInt(process.env.GITHUB_INSTALLATION_ID!)
    );
  });

  it("throws an error if GITHUB_PRIVATE_KEY is not set", async () => {
    delete process.env.GITHUB_PRIVATE_KEY;

    await expect(main({} as any)).rejects.toThrowError(
      "GITHUB_PRIVATE_KEY is not set"
    );
  });

  it("throws an error if GITHUB_APP_ID is not set", async () => {
    delete process.env.GITHUB_APP_ID;

    await expect(main({} as any)).rejects.toThrowError(
      "GITHUB_APP_ID is not set"
    );
  });

  it("throws an error if GITHUB_INSTALLATION_ID is not set", async () => {
    delete process.env.GITHUB_INSTALLATION_ID;

    await expect(main({} as any)).rejects.toThrowError(
      "GITHUB_INSTALLATION_ID is not set"
    );
  });

  it("throws an error if GITHUB_OWNER is not set", async () => {
    delete process.env.GITHUB_OWNER;

    await expect(main({} as any)).rejects.toThrowError(
      "GITHUB_OWNER is not set"
    );
  });

  it("throws an error if GITHUB_REPOSITORY is not set", async () => {
    delete process.env.GITHUB_REPOSITORY;

    await expect(main({} as any)).rejects.toThrowError(
      "GITHUB_REPOSITORY is not set"
    );
  });
});
