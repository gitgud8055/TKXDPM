import { Link } from "react-router-dom";

interface T {
  children: string;
  color: string;
  to: string;
}

export default function RedirectText({ children, color, to }: T) {
  return (
    <Link
      to={to}
      style={{
        color,
      }}
      className={`text-sm hover:border-b-[${color}] hover:border-b-[1px] border-solid hover:cursor-pointer`}
    >
      {children}
    </Link>
  );
}
