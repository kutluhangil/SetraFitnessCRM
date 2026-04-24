import Link from 'next/link';
import { Dumbbell } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-radial-glow grid lg:grid-cols-[1fr_520px]">
      {/* Left brand panel — desktop only */}
      <aside className="relative hidden lg:flex flex-col justify-between p-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-mesh opacity-60 pointer-events-none" />

        <Link href="/" className="relative z-10 inline-flex items-center gap-2.5 w-fit">
          <div className="h-9 w-9 rounded-lg bg-white text-black flex items-center justify-center">
            <Dumbbell className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-semibold tracking-tight">FitCRM</span>
        </Link>

        <div className="relative z-10 max-w-md">
          <blockquote className="text-2xl font-light leading-relaxed tracking-tight text-text-primary">
            &ldquo;Eski Excel&rsquo;i bir anda bıraktım. Müşteri sayım 8&rsquo;den 34&rsquo;e
            çıktı, hala her birini hatırlıyorum.&rdquo;
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-bg-tertiary border border-border-primary" />
            <div>
              <div className="text-sm font-medium">Ali Yılmaz</div>
              <div className="text-xs text-text-tertiary">Fitness Koçu · İstanbul</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Right form panel */}
      <main className="flex items-center justify-center p-6 sm:p-10 relative">
        <div className="w-full max-w-sm">{children}</div>
      </main>
    </div>
  );
}
