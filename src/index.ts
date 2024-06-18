import { config as dotenvConfig } from 'dotenv';
import app from './app';
import Config from './config';

dotenvConfig();

const PORT = Config.env_var.dev.serverConfig.PORT || 3000;

app.listen(PORT, () => {
  console.log(`The application is listening on port ${PORT}!`);
});
