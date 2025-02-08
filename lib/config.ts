// lib/config.ts

export function validateEnvironment(
  required: string[]
): Record<string, string> {
  const env: Record<string, string> = {}

  for (const key of required) {
    const value = process.env[key]
    if (!value) {
      throw new Error(
        `Missing required environment variable: ${key}. ` +
          `Please check your .env file and ensure it is properly configured.`
      )
    }
    env[key] = value
  }

  return env
}
