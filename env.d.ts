declare namespace NodeJS {
  export interface ProcessEnv {
    PUBLIC_GOOGLE_API_KEY: string
    MAILGUN_API_KEY: string
    MAILGUN_DOMAIN: string
    TO_EMAIL: string
    FROM_EMAIL: string
    TEMPLATE: string
  }
}

declare global {
  export type Review = {
    author_name: string
    author_url: string
    profile_photo_url: string
    rating: number
    relative_time_description: string
    text: string
  }

  export type Contact = Record<'firstName' | 'lastName' | 'email' | 'phone' | 'message', string>
}

export {}
