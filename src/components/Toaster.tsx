import * as RToast from '@radix-ui/react-toast';
import { useToast } from '@/features/toast/ToastProvider';

export default function Toaster() {
  const { toasts, hide } = useToast();

  return (
    <RToast.Provider swipeDirection="right">
      {toasts.map((t) => (
        <RToast.Root
          key={t.id}
          duration={4000}
          style={{
            background: 'var(--background)',
            color: 'var(--foreground)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '12px 14px',
            boxShadow: '0 10px 20px rgba(0,0,0,.08)',
          }}
          data-variant={t.variant ?? 'info'}
          onOpenChange={(open) => {
            if (!open) hide(t.id);
          }}
        >
          {t.title && (
            <RToast.Title style={{ fontWeight: 600, marginBottom: 4 }}>
              {t.title}
            </RToast.Title>
          )}
          {t.description && (
            <RToast.Description style={{ opacity: 0.8 }}>
              {t.description}
            </RToast.Description>
          )}
        </RToast.Root>
      ))}
      <RToast.Viewport
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          width: 360,
          maxWidth: 'calc(100vw - 32px)',
          zIndex: 1000,
        }}
      />
    </RToast.Provider>
  );
}
