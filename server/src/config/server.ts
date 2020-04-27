interface IServerConfig {
  url: string
  port: string
  getUrl(): string
}

class ServerConfig implements IServerConfig {
  public url: string
  public port: string

  constructor(url: string, port: string) {
    this.url = url
    this.port = port
  }

  getUrl(): string {
    return `${this.url}:${this.port}`
  }
}

const serverConfig = new ServerConfig(
  process.env.PEABODY_URL || "localhost",
  process.env.PEABODY_PORT || "9122",
)

export default serverConfig
