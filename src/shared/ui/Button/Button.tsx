import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  className?: string;
}

function Button({ children, size = "medium", onClick, className }: ButtonProps) {
  return (
    <button 
      className={`${styles.button} ${styles[size]} ${className || ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;