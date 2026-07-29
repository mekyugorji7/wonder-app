import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { GenerationSteps } from "@/components/dashboard/GenerationSteps";
import {
  WONDER_MATERIALS_QUESTION,
  WONDER_PROMPT_QUESTION,
  WONDER_TOPIC_QUESTION,
} from "@/lib/chatSetup";
import { LinkedInPostCard } from "@/components/dashboard/LinkedInPostCard";
import type { ChatMessage } from "@/components/dashboard/projects";

const SETUP_QUESTIONS = new Set([
  WONDER_TOPIC_QUESTION,
  WONDER_PROMPT_QUESTION,
  WONDER_MATERIALS_QUESTION,
]);

function UserBubble({ children }: { children: string }) {
  const shouldReduceMotion = useReducedMotion();

  const bubble = (
    <div className="max-w-[85%] rounded-2xl rounded-br-md bg-white/80 px-4 py-3 text-sm leading-relaxed text-title shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
      {children}
    </div>
  );

  if (shouldReduceMotion) {
    return <div className="flex justify-end">{bubble}</div>;
  }

  return (
    <motion.div
      className="flex justify-end"
      initial={{ opacity: 0, x: 16, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      {bubble}
    </motion.div>
  );
}

function SetupQuestionBubble({ content }: { content: string }) {
  const shouldReduceMotion = useReducedMotion();
  const parts = content.split("\n\n");
  const [heading, ...examples] = parts;
  const words = heading.split(" ");

  if (shouldReduceMotion) {
    return (
      <div className="flex justify-start">
        <div className="max-w-[90%] whitespace-pre-wrap text-sm leading-relaxed text-title">
          {content}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="flex justify-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-[90%] text-sm leading-relaxed text-title">
        <p>
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              className="inline-block mr-[0.25em]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: i * 0.045,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </p>
        {examples.map((example, i) => (
          <motion.p
            key={i}
            className="mt-3 text-muted"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: words.length * 0.045 + 0.25 + i * 0.15,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            {example}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}

function WonderBubble({
  message,
  authorName,
}: {
  message: ChatMessage;
  authorName: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const { content, linkedInPost } = message;

  if (linkedInPost) {
    const card = (
      <LinkedInPostCard
        post={linkedInPost}
        authorName={authorName}
        plainText={content}
      />
    );

    if (shouldReduceMotion) {
      return <div className="flex justify-start">{card}</div>;
    }

    return (
      <motion.div
        className="flex w-full justify-start"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 22 }}
      >
        {card}
      </motion.div>
    );
  }

  if (SETUP_QUESTIONS.has(content)) {
    return <SetupQuestionBubble content={content} />;
  }

  const bubble = (
    <div className="max-w-[90%] whitespace-pre-wrap text-sm leading-relaxed text-title">
      {content}
    </div>
  );

  if (shouldReduceMotion) {
    return <div className="flex justify-start">{bubble}</div>;
  }

  return (
    <motion.div
      className="flex justify-start"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 22 }}
    >
      {bubble}
    </motion.div>
  );
}

interface ChatMessagesProps {
  messages: ChatMessage[];
  authorName: string;
  isReplying?: boolean;
}

export function ChatMessages({ messages, authorName, isReplying }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isReplying]);

  return (
    <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto px-5 py-4">
      <div className="mx-auto max-w-2xl space-y-5">
        {messages.map((msg) =>
          msg.role === "user" ? (
            <UserBubble key={msg.id}>{msg.content}</UserBubble>
          ) : (
            <WonderBubble key={msg.id} message={msg} authorName={authorName} />
          )
        )}
        {isReplying && (
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <GenerationSteps active={isReplying} />
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
