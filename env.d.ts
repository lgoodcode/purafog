declare namespace NodeJS {
	export interface ProcessEnv {
		PUBLIC_GOOGLE_API_KEY: string
		SENDGRID_API_KEY: string
		TO_EMAIL: string
		FROM_EMAIL: string
		TEMPLATE_ID: string
	}
}
