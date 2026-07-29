import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useBusinessContext } from "@/components/dashboard/BusinessContextProvider";

const steps = [
  {
    key: "businessName",
    label: "What's your business name?",
    placeholder: "e.g. Acme Labs, Northstar Co.",
    type: "input" as const,
    optional: false,
  },
  {
    key: "productDescription",
    label: "Describe what you're building",
    placeholder: "e.g. A tool that helps teams work faster and stay aligned",
    type: "textarea" as const,
    optional: false,
  },
  {
    key: "platformUse",
    label: "What do you aim to use Wonder for?",
    placeholder: "e.g. LinkedIn posts to share company updates and grow our brand",
    type: "textarea" as const,
    optional: false,
  },
  {
    key: "linksAndMaterials",
    label: "Any links or materials Wonder should know about?",
    placeholder: "e.g. Your website, blog post, or press kit",
    type: "textarea" as const,
    optional: true,
  },
];

interface OnboardingPageProps {
  mode?: "initial" | "add";
}

export function OnboardingPage({ mode = "initial" }: OnboardingPageProps) {
  const navigate = useNavigate();
  const {
    completeOnboarding,
    skipOnboarding,
    addBusiness,
    addRosewoodBusiness,
  } = useBusinessContext();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    businessName: "",
    productDescription: "",
    platformUse: "",
    linksAndMaterials: "",
  });
  const [error, setError] = useState("");

  const isAdd = mode === "add";
  const current = steps[step];
  const value = form[current.key as keyof typeof form];

  const handleSkip = () => {
    if (isAdd) {
      addRosewoodBusiness();
      navigate("/app/business");
    } else {
      skipOnboarding();
      navigate("/app");
    }
  };

  const handleContinue = () => {
    if (!current.optional && !value.trim()) {
      setError("This field is required.");
      return;
    }
    setError("");

    if (step < steps.length - 1) {
      setStep((s) => s + 1);
      return;
    }

    if (isAdd) {
      addBusiness(form);
      navigate("/app/business");
    } else {
      completeOnboarding(form);
      navigate("/app");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-sky-200 via-sky-50 to-white px-4">
      <div className="w-full max-w-md">
        <p className="mb-2 text-center font-display text-2xl font-bold text-title">
          wonder
        </p>
        <p className="mb-8 text-center text-sm text-sub">
          {isAdd
            ? "Add another business to your workspace."
            : "Let's set up your workspace in a few quick steps."}
        </p>

        <div className="mb-6 flex justify-center gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 w-8 rounded-full transition-colors",
                i <= step ? "bg-sky-500" : "bg-sky-200"
              )}
            />
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 shadow-[0_24px_80px_rgba(26,26,26,0.08)]">
          <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted">
            Step {step + 1} of {steps.length}
            {current.optional && " — optional"}
          </p>
          <label
            htmlFor="onboarding-field"
            className="mb-4 block font-display text-lg font-semibold text-title"
          >
            {current.label}
          </label>

          {current.type === "input" ? (
            <Input
              id="onboarding-field"
              placeholder={current.placeholder}
              value={value}
              onChange={(e) => {
                setForm((f) => ({ ...f, [current.key]: e.target.value }));
                if (error) setError("");
              }}
              autoFocus
            />
          ) : (
            <textarea
              id="onboarding-field"
              placeholder={current.placeholder}
              value={value}
              onChange={(e) => {
                setForm((f) => ({ ...f, [current.key]: e.target.value }));
                if (error) setError("");
              }}
              rows={4}
              autoFocus
              className="flex w-full resize-none rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-heading text-title placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            />
          )}

          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

          <div className="mt-6 flex flex-col gap-3">
            <Button type="button" className="w-full" onClick={handleContinue}>
              {step < steps.length - 1
                ? "Continue"
                : isAdd
                  ? "Add business"
                  : "Get started"}
            </Button>
            <button
              type="button"
              onClick={handleSkip}
              className="text-center text-sm text-muted transition-colors hover:text-title"
            >
              {isAdd ? "Add Rosewood Bakery instead" : "Try with Rosewood Bakery"}
            </button>
            {isAdd && (
              <button
                type="button"
                onClick={() => navigate("/app/business")}
                className="text-center text-sm text-muted transition-colors hover:text-title"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
