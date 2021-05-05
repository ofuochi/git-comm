interface GithubConfig {
  baseUrl: string;
  accessHeader: string;
}
interface Configuration {
  port: number;
  environment: string;
  githubConfig: GithubConfig;
}

export default (): Configuration => ({
  port: +process.env.PORT,
  environment: process.env.NODE_ENV,
  githubConfig: {
    baseUrl: process.env.GITHUB_BASE_URL,
    accessHeader: process.env.GITHUB_ACCESS_HEADER,
  },
});
