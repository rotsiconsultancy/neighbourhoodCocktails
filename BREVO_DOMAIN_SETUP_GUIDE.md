# Brevo Domain & Sender Authentication Setup Guide

This guide is for the Brevo account owner of **The Neighbourhood Cocktails**. Following these steps will authorize the website to send emails on behalf of `neighbourhoodcocktails.com` and ensure they land directly in the user's primary inbox (avoiding the spam folder).

---

## 1. Configure the Authorized Sender Email

The website uses the `BREVO_SENDER_EMAIL` environment variable to dispatch booking confirmations and feedback emails. This email address must be verified in Brevo.

### Steps to Add a Sender:
1. Log in to the [Brevo Dashboard](https://brevo.com).
2. Click on the top-right account menu (your name) and select **Senders & IP**.
3. Under the **Senders** tab, click the blue **Add a Sender** button.
4. Fill in the details:
   * **Sender Name**: `The Neighbourhood Cocktails`
   * **Sender Email**: `hello@neighbourhoodcocktails.com` (or your preferred email)
5. Click **Save**.
6. Brevo will send a verification email to that inbox. Open the email and click the confirmation link.

---

## 2. Authenticate Your Custom Domain (Crucial for Spam Prevention)

To guarantee high email deliverability, you must configure SPF, DKIM, and DMARC keys on your domain registrar (e.g., GoDaddy, Namecheap, HostPinnacle, etc.).

### Steps to Authenticate Domain:
1. In the Brevo Dashboard, go to **Senders & IP** > **Domains** tab.
2. Click **Add a Domain**.
3. Enter your domain: `neighbourhoodcocktails.com`.
4. Click **Save**.
5. Brevo will display a list of **DNS Records** (TXT records) that need to be added to your domain registrar's DNS settings:
   * **DKIM Record**: A TXT record named `mail._domainkey.neighbourhoodcocktails.com` containing a long key code.
   * **SPF Record**: A TXT record modifying your existing SPF or adding `v=spf1 include:spf.sendinblue.com ~all`.
6. Go to your domain registrar's DNS Management panel, add these records, and save.
7. Return to Brevo and click **Verify & Authenticate**. (Note: DNS changes can take from 10 minutes to a few hours to propagate globally).

---

## 3. Retrieve Your API Key for the Developer

To connect the website forms to Brevo, the developer needs a secure API Key.

### Steps to Get the API Key:
1. In the Brevo Dashboard, click your account menu in the top-right and select **SMTP & API**.
2. Click the **API Keys** tab.
3. Click **Generate a new API key**.
4. Name it `Website Integration` and click **Generate**.
5. **Copy the key immediately** (it will only be displayed once) and securely share it with the developer.

---

> [!IMPORTANT]
> Keep the generated API key secure. It should never be shared publicly or committed to public GitHub repositories.
