const requestFn = jest.fn();

export class Octokit {
  request = requestFn;
}

const getInstallationOctokitFn = jest.fn().mockResolvedValue(new Octokit());

export class App {
  public test = "hello";

  getInstallationOctokit = getInstallationOctokitFn;
}
