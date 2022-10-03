export default () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  dbUri: process.env.DB_URI,
  repositoryUrl: process.env.REPOSITORY_URL,
});
