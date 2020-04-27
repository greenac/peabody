interface IProxy {
  url: string
  port: string

  getUrl(): string
}

class ProxyConfig {
  public url: string
  public port: string

  constructor(url: string, port: string) {
    this.url = url
    this.port = port
  }

  getUrl(): string {
    let url: string
    if (this.port && this.port != "") {
      url = `${this.url}:${this.port}/`
    } else {
      url = this.url
    }

    return url
  }
}

const proxyConfig = new ProxyConfig(
  process.env.ARTEMIS_URL || "localhost",
  process.env.ARTEMIS_PORT || "9123",
)

export default proxyConfig
