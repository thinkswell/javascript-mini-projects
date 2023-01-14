import React, { ReactComponentElement } from "react";
import { MdClear } from "react-icons/md";
import "./card-item.scss";

interface PropsType {
  children: ReactComponentElement<any>[] | ReactComponentElement<any>;
  className?: string;
  onRemove?: () => void;
  withoutRemove?: boolean;
}

export function CardItem(props: PropsType) {
  return (
    <div className={props.className + " card-item card p-3"}>
      {!props.withoutRemove ? (
        <div className="remove-item">
          <MdClear onClick={props.onRemove} role="button" />
        </div>
      ) : null}
      {props.children}
    </div>
  );
}
