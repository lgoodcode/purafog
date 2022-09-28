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
