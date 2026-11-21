/**
 * Real contact-form mailer using FormSubmit.co AJAX endpoint.
 *
 * The destination address can be overridden via VITE_CONTACT_EMAIL env var.
 * Note: the first submission triggers a one-time activation email to the
 * recipient — click the confirmation link once and deliveries start.
 */

export const CONTACT_EMAIL: string =
  (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) || 'mzdrowy@gmail.com';

export interface ContactPayload {
  name?: string;
  email: string;
  subject: string;
  projectType: string;
  message: string;
}

interface FormSubmitResponse {
  success?: string | boolean;
  message?: string;
}

export async function sendContactMessage(payload: ContactPayload): Promise<void> {
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _subject: payload.subject,
      _template: 'table',
      _captcha: 'false',
      name: payload.name?.trim() || '-',
      email: payload.email,
      projectType: payload.projectType,
      message: payload.message,
    }),
  });

  let data: FormSubmitResponse = {};
  try {
    data = (await res.json()) as FormSubmitResponse;
  } catch {
    // Non-JSON response — fall through to status-based check.
  }

  const failed = data.success === 'false' || data.success === false;
  if (!res.ok || failed) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }
}
