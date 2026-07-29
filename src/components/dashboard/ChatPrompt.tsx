import { useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowUp, Plus } from "iconoir-react";
import { cn } from "@/lib/utils";

interface ChatPromptProps {
  onSend: (content: string) => void;
  disabled?: boolean;
  placeholder?: string;
  allowEmpty?: boolean;
}

export function ChatPrompt({
  onSend,
  disabled,
  placeholder = "How can we help?",
  allowEmpty = false,
}: ChatPromptProps) {
  const [value, setValue] = useState("");

  const submit = () => {
    const trimmed = value.trim();
    if (disabled || (!trimmed && !allowEmpty)) return;
    onSend(trimmed);
    setValue("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="shrink-0 px-5 pb-5 pt-2">
      <div
        className={cn(
          "mx-auto flex max-w-2xl items-end gap-2 rounded-[28px] bg-white px-3 py-2.5 shadow-[0_4px_24px_rgba(15,23,42,0.08)]",
          disabled && "opacity-60"
        )}
      >
        <button
          type="button"
          disabled
          aria-label="Attach — coming soon"
          className="flex h-9 w-9 shrink-0 cursor-not-allowed items-center justify-center rounded-full bg-sky-50 text-muted"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
        </button>

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
          placeholder={placeholder}
          className={cn(
            "max-h-32 min-h-[36px] flex-1 resize-none border-0 bg-transparent py-1.5 text-sm text-title placeholder:text-muted focus:outline-none focus:ring-0",
            disabled && "cursor-not-allowed"
          )}
        />

        <button
          type="submit"
          disabled={disabled || (!allowEmpty && !value.trim())}
          aria-label="Send message"
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sub transition-colors hover:bg-sky-100 hover:text-title",
            "disabled:cursor-not-allowed disabled:opacity-40"
          )}
        >
          <ArrowUp className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
    </form>
  );
}
