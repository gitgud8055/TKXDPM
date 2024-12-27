import { useEffect } from "react";
import WSListener from "../ws-listener";
import EventListener from "../event-listener";

const Wrapper = (
  props: React.HTMLAttributes<HTMLDivElement> & { title?: string }
) => {
  useEffect(() => {
    document.title = props.title ?? "Đi chợ tiện lợi";
  });

  return (
    <div {...props} className={"w-full h-full " + props.className}>
      {props.children}
      <EventListener />
      <WSListener />
    </div>
  );
};

export default Wrapper;
