import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const inputClass =
  "w-full rounded-nested border border-ink/15 bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-soft/50 focus:border-accent focus:outline-none";

export function Panel({
  title,
  children,
  actions,
}: {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="rounded-card border border-ink/10 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink">{title}</h2>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

type ButtonVariant = "default" | "ghost" | "danger";

const buttonBase = "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40";
const buttonVariants: Record<ButtonVariant, string> = {
  default: "bg-ink text-cream hover:bg-ink/85",
  ghost: "border border-ink/15 bg-cream text-ink-soft hover:text-ink",
  danger: "bg-[#EFE3DE] text-[#7A5C52] hover:bg-[#e6d2c9]",
};

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
}

export function Button({ children, variant = "default", disabled, href, target, rel, onClick, type = "button" }: ButtonProps) {
  const className = `${buttonBase} ${buttonVariants[variant]}`;
  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={className}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
}

export function Field({ label, className = "", children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <label className={`flex flex-col gap-1 text-sm ${className}`}>
      <span className="text-xs font-medium uppercase tracking-wide text-ink-soft">{label}</span>
      {children}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function TextAreaInput(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function SelectInput(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

interface FieldValueProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function TextField({ label, value, onChange, placeholder, className }: FieldValueProps) {
  return (
    <Field label={label} className={className}>
      <TextInput type="text" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </Field>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  className,
}: FieldValueProps & { rows?: number }) {
  return (
    <Field label={label} className={className}>
      <TextAreaInput rows={rows} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </Field>
  );
}

export function DateField({ label, value, onChange, className }: FieldValueProps) {
  return (
    <Field label={label} className={className}>
      <TextInput type="date" value={value} onChange={(e) => onChange(e.target.value)} />
    </Field>
  );
}

export function TimeField({ label, value, onChange, className }: FieldValueProps) {
  return (
    <Field label={label} className={className}>
      <TextInput type="time" value={value} onChange={(e) => onChange(e.target.value)} />
    </Field>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  className,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}) {
  return (
    <Field label={label} className={className}>
      <TextInput
        type="number"
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
      />
    </Field>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <Field label={label} className={className}>
      <SelectInput value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </SelectInput>
    </Field>
  );
}

export function ImageField({ label, value, onChange, className }: FieldValueProps) {
  return (
    <Field label={label} className={className}>
      <div className="flex items-center gap-3">
        <TextInput
          type="text"
          value={value}
          placeholder="https://… or /images/…"
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
        />
        {value ? (
          <img
            src={value}
            alt=""
            className="h-12 w-12 shrink-0 rounded-nested border border-ink/10 object-cover"
            onError={(e) => {
              e.currentTarget.style.opacity = "0";
            }}
            onLoad={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          />
        ) : (
          <div className="h-12 w-12 shrink-0 rounded-nested border border-dashed border-ink/20" />
        )}
      </div>
    </Field>
  );
}

export function StringListField({
  label,
  items,
  onChange,
  placeholder,
  multiline,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-ink-soft">{label}</span>
        <Button variant="ghost" onClick={() => onChange([...items, ""])}>
          + Add
        </Button>
      </div>
      <div className="mt-2 space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            {multiline ? (
              <TextAreaInput
                className="flex-1"
                rows={2}
                value={item}
                placeholder={placeholder}
                onChange={(e) => onChange(items.map((v, idx) => (idx === i ? e.target.value : v)))}
              />
            ) : (
              <TextInput
                className="flex-1"
                value={item}
                placeholder={placeholder}
                onChange={(e) => onChange(items.map((v, idx) => (idx === i ? e.target.value : v)))}
              />
            )}
            <Button variant="danger" onClick={() => onChange(items.filter((_, idx) => idx !== i))}>
              Remove
            </Button>
          </div>
        ))}
        {items.length === 0 && <p className="text-xs text-ink-soft/70">Nothing added yet.</p>}
      </div>
    </div>
  );
}
