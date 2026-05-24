interface TaskbarButtonProps {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  isActive?: boolean;
  onClick?: () => void;
}

export default function TaskbarButton({
  Icon,
  isActive = false,
  onClick,
}: TaskbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer h-full px-4 flex flex-col items-center justify-center relative hover:bg-white/5 transition-all duration-200 group ${isActive ? 'text-[--color-surface-tint] after:content-[""] after:absolute after:bottom-0 after:w-1 after:h-1 after:bg-[--color-surface-tint] after:rounded-full' : "text-[--color-on-surface-variant] hover:text-[--color-on-surface]"}`}
    >
      <Icon
        className="w-5 h-5 group-active:scale-95 transition-transform"
        strokeWidth={1.5}
      />
    </button>
  );
}
