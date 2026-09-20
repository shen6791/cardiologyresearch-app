export default function SplitReveal({ text, className = '', delayStart = 0 }: { text: string; className?: string; delayStart?: number }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="split-word">
          <span style={{ animationDelay: `${delayStart + i * 60}ms` }}>{word}{i < words.length - 1 ? ' ' : ''}</span>
        </span>
      ))}
    </span>
  );
}
