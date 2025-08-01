'use client';

import { Twitter, Facebook, Linkedin, Link as LinkIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export function SocialShare({ title }: { title: string }) {
  const { toast } = useToast();
  const pathname = usePathname();
  const [url, setUrl] = useState('');

  useEffect(() => {
    // This ensures the code runs only on the client, after hydration
    setUrl(window.location.origin + pathname);
  }, [pathname]);


  const copyToClipboard = () => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    toast({
      title: 'Link Copied!',
      description: 'The URL has been copied to your clipboard.',
    });
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium mr-2">Share:</span>
      <Button
        variant="outline"
        size="icon"
        asChild
        aria-label="Share on Twitter"
        disabled={!url}
      >
        <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer">
          <Twitter className="h-4 w-4" />
        </a>
      </Button>
      <Button
        variant="outline"
        size="icon"
        asChild
        aria-label="Share on Facebook"
        disabled={!url}
      >
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer">
          <Facebook className="h-4 w-4" />
        </a>
      </Button>
      <Button
        variant="outline"
        size="icon"
        asChild
        aria-label="Share on LinkedIn"
        disabled={!url}
      >
         <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`} target="_blank" rel="noopener noreferrer">
          <Linkedin className="h-4 w-4" />
        </a>
      </Button>
      <Button variant="outline" size="icon" onClick={copyToClipboard} aria-label="Copy link" disabled={!url}>
        <LinkIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
