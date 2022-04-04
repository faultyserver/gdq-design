import * as React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import styles from "./Anchor.mod.css";

const ABSOLUTE_URL_REGEX = /^(https?:)?\/\//;

export interface AnchorProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => unknown;
}

export function Anchor(props: AnchorProps) {
  const { href, children, className, onClick } = props;

  const isAbsolute = ABSOLUTE_URL_REGEX.test(href);

  if (isAbsolute) {
    console.log("link was absolute");
    return (
      <a href={href} className={classNames(styles.anchor, className)} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={classNames(styles.anchor, className)} onClick={onClick}>
      {children}
    </Link>
  );
}
