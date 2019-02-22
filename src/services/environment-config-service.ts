export class EnvironmentConfigService {

  async getCurrentConfig() {
    
    let envFile = await fetch('/env-config.json');
    let env = await envFile.json();
    let currentEnv = env.current_environment;
    let config = env[currentEnv];
    
    return config;
  }
}