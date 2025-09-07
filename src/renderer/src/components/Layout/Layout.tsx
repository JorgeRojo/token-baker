import { JSX, PropsWithChildren } from 'react';
import styles from './Layout.module.css';

type LayoutProps = PropsWithChildren;

export function Layout({ children }: LayoutProps): JSX.Element {
  return <div className={styles.layout}>{children}</div>;
}
