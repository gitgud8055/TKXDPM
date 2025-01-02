import React from "react";
import { Link } from "react-router-dom";

export default function ReloadLink({ to }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    ref.current.click();
  }, []);
  return <Link to={to} reloadDocument ref={ref} />;
}
