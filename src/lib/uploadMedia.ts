/**
 * Helper function to upload media (images/video) to an external CDN (e.g. Cloudflare R2, AWS S3, etc.)
 * You can replace CDN_ENDPOINT and add headers/auth as required by your provider.
 */

const CDN_ENDPOINT = process.env.NEXT_PUBLIC_CDN_ENDPOINT || 'https://<your-cdn>.r2.cloudflarestorage.com/upload';

export async function uploadMedia(file: File): Promise<string> {
  // Create a form data object to send the file
  const form = new FormData();
  form.append('file', file);

  try {
    const res = await fetch(CDN_ENDPOINT, {
      method: 'POST',
      body: form,
      // Add Authorization headers here if needed:
      // headers: { 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CDN_TOKEN}` }
    });

    if (!res.ok) {
      throw new Error(`CDN upload failed with status: ${res.status}`);
    }

    const data = await res.json();
    
    // Validate we actually got a URL back; adjust 'url' depending on the CDN's response format
    if (!data.url) {
        throw new Error('CDN responded but did not provide a URL.');
    }

    return data.url;
  } catch (error) {
    console.error('Error uploading media:', error);
    throw error;
  }
}
