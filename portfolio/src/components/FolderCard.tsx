import { useRef, useState, type ReactNode } from "react";

interface FolderCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  title?: string; // Tab title
}

const FolderCard: React.FC<FolderCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
  title,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div className={`relative pt-8 ${className}`}>
      {/* Folder Tab Area */}
      {title && (
        <div
          className="absolute top-0 left-0 h-8 bg-neutral-900 border-t border-l border-r border-neutral-800 rounded-t-lg px-4 flex items-center z-10"
          style={{ 
            width: "fit-content", 
            minWidth: "120px",
            // Removed marginBottom since it doesn't affect absolute positioning like this
          }}
        >
          <span className="text-sm font-lexend text-gray-400 tracking-wide font-medium">
            {title}
          </span>
          {/* Cover the body's top border where the tab sits */}
          <div className="absolute -bottom-px left-0 right-0 h-px bg-neutral-900 z-20" />
        </div>
      )}

      {/* Main Card Body */}
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative z-0 rounded-b-xl rounded-tr-xl rounded-tl-none border border-neutral-800 bg-neutral-900 overflow-hidden p-6 h-[calc(100%-2rem)]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
          style={{
            opacity,
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
          }}
        />
        {children}
      </div>
    </div>
  );
};

export default FolderCard;
