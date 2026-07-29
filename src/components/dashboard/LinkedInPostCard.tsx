import { useState } from "react";
import { Copy, ShareIos, Check } from "iconoir-react";
import { Avatar } from "@/components/ui/avatar";
import { getBusinessInitials } from "@/components/dashboard/businessContext";
import type { LinkedInPostData } from "@/components/dashboard/projects";
import { cn } from "@/lib/utils";

interface LinkedInPostCardProps {
  post: LinkedInPostData;
  authorName: string;
  plainText: string;
}

function formatPostForCopy(plainText: string): string {
  return plainText.trim();
}

export function LinkedInPostCard({
  post,
  authorName,
  plainText,
}: LinkedInPostCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = formatPostForCopy(plainText);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const text = formatPostForCopy(plainText);
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.link.title,
          text,
          url: post.link.url,
        });
        return;
      } catch {
        // fall through to copy
      }
    }
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-[520px] overflow-hidden rounded-lg border border-[#e8e8e8] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)]">
      <div className="flex items-start justify-between gap-3 px-4 pt-4">
        <div className="flex min-w-0 gap-3">
          <Avatar
            fallback={getBusinessInitials(authorName)}
            className="h-12 w-12 bg-[#0a66c2]/10 text-sm font-semibold text-[#0a66c2]"
          />
          <div className="min-w-0 pt-0.5">
            <p className="truncate text-[15px] font-semibold leading-tight text-[#191919]">
              {authorName}
            </p>
            <p className="truncate text-xs text-[#666666]">Founder</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-[#666666]">
              <span>Just now</span>
              <span>·</span>
              <span aria-hidden>🌐</span>
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy post"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#666666] transition-colors hover:bg-[#f3f2ef] hover:text-[#191919]"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-600" strokeWidth={2} />
            ) : (
              <Copy className="h-4 w-4" strokeWidth={2} />
            )}
          </button>
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share post"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#666666] transition-colors hover:bg-[#f3f2ef] hover:text-[#191919]"
          >
            <ShareIos className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="px-4 pb-3 pt-3">
        <div className="whitespace-pre-wrap text-[14px] leading-[1.45] text-[#191919]">
          {post.body.split("\n\n").map((paragraph, i) => (
            <p key={i} className={cn(i > 0 && "mt-3")}>
              {paragraph}
            </p>
          ))}
        </div>
        <p className="mt-3 text-[14px] leading-[1.45] text-[#0a66c2]">
          {post.hashtags.map((tag) => `#${tag}`).join(" ")}
        </p>
      </div>

      <div className="border-t border-[#e8e8e8]">
        <img
          src={post.imageSrc}
          alt="Entrepreneurs First Fellowship Residency"
          className="aspect-[1.91/1] w-full object-cover"
        />
      </div>

      <a
        href={post.link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block border-t border-[#e8e8e8] bg-[#f3f2ef] transition-colors hover:bg-[#ebe9e6]"
      >
        <div className="px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-[#666666]">
            {post.link.domain}
          </p>
          <p className="mt-1 text-sm font-semibold leading-snug text-[#191919]">
            {post.link.title}
          </p>
        </div>
      </a>
    </div>
  );
}
