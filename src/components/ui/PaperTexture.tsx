import { cn } from "@/lib/utils";

interface PaperTextureProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function PaperTexture({ children, className, id }: PaperTextureProps) {
  return (
    <section id={id} className={cn("relative bg-white", className)}>
      {children}
    </section>
  );
}
