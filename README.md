# Astro

Astro is awesome. It does, howver, have a few quirks.

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

- `MAILGUN_API_KEY` - The API key for Mailgun
- `MAILGUN_DOMAIN` - The domain for Mailgun
- `FROM_EMAIL` - The email address to send the emails from for the user (lisa@purafog.com)
- `FROM_NAME` - The name to send the emails from for the user (Lisa)
- `TO_EMAIL` - The email address to send the emails to from the form
- `TO_NAME` - The name to send the emails to from the form (no-reply|PURaFOG)
- `TEMPLATE` - The template to use for the email in Mailgun


## Netlify Functions

This project uses edge functions to handle the form submission. The functions are located in the `functions` folder,
which is a custom location, specified in the `netlify.toml` file. The main location would be in the root of the project.

The `reviews` function is used to perform the fetch to the Google Business API to retrieve the reviews. This is because
the Google API will not allow CORS requests, so it must be done on the server side. Using the edge functions allows
the request to be made closer to the client instead of the server.

## `InitialReviews.ts`

This is used to display the reviews from the **Service Area** business profile. This is because there is no Google
API key to be able to manage this so I had to hard code the values to be able to display them.

## **TODO**
- Look maybe check another time if it's possible to get the other reviews without an API key.
- Add JS to add a prefetch `<link>` element on navigation hover, to preload the next page.
