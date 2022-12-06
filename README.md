## Tech Stack

<div width="100%">
  <img src="https://img.shields.io/badge/Astro-FF5D01.svg?style=for-the-badge&logo=Astro&logoColor=white" />
  <img src="https://img.shields.io/badge/Preact-673AB8.svg?style=for-the-badge&logo=Preact&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4.svg?style=for-the-badge&logo=Tailwind-CSS&logoColor=white" />
  <img src="https://img.shields.io/badge/CircleCI-343434.svg?style=for-the-badge&logo=CircleCI&logoColor=white" />
  <img src="https://img.shields.io/badge/Netlify-00C7B7.svg?style=for-the-badge&logo=Netlify&logoColor=white" />
</div>

## VSCode

Because Astro has different syntax, it has it's own settings to allow it to work with VSCode.
You can find them in the `.vscode` folder.

- Astro extension
- Debugging settings
- Allow Eslint validation for Astro files
  - The Eslint configuration also includes specifics for Astro

## Environment Variables

The environment variables are used for the Mailgun API and Google Business API to retrieve the reviews
for the business.

- `SENDINBLUE_API_KEY` - The API key for SendInBlue
- `FROM_EMAIL` - The email address to send the emails from for the user 
- `[FROM_NAME] PURaFOG` - The name to send the emails from for the user 
- `TO_EMAIL` - The email address to send the emails to from the form
- `[TO_NAME] Lisa Stephens` - The name to send the emails to from the form 
- `TEMPLATE_ID` - The template to use for the email in SendInBlue

## Google Analytics

Using [Partytown](https://docs.astro.build/en/guides/integrations-guide/partytown/) for running the analytics scripts in a web worker.

## Transactional Emails

The provider used is [Send In Blue](https://app-smtp.sendinblue.com/), which provides real time tracking,
better template editing, and free domain emails.

## Netlify Functions

This project uses edge functions to handle the form submission. The functions are located in the `functions` folder,
which is a custom location, specified in the `netlify.toml` file. The main location would be in the root of the project.

The `reviews` function is used to perform the fetch to the Google Business API to retrieve the reviews. This is because
the Google API will not allow CORS requests, so it must be done on the server side. Using the edge functions allows
the request to be made closer to the client instead of the server.

## `InitialReviews.ts`

This is used to display the reviews from the **Service Area** business profile. This is because there is no Google
API key to be able to manage this so I had to hard code the values to be able to display them.
