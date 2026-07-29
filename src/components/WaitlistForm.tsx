import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface WaitlistFormProps {
  className?: string;
  id?: string;
  compact?: boolean;
}

export function WaitlistForm({ className, id, compact = false }: WaitlistFormProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/app/onboarding/add");
  };

  return (
    <div className={cn("w-full", className)}>
      <motion.form
        id={id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className={cn(
          "flex w-full gap-3",
          compact ? "flex-col sm:flex-row" : "flex-col sm:flex-row max-w-md mx-auto"
        )}
      >
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
          className="flex-1"
        />
        <Button type="submit" className="shrink-0">
          Try Wonder Free
        </Button>
      </motion.form>
    </div>
  );
}
