import  {
    type AnchorHTMLAttributes,
    type ButtonHTMLAttributes,
    type PropsWithChildren
} from 'react';

import styles from './Button.module.scss';
import {classNames} from "../../Lib/classNames.ts";


type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type BaseProps = {
    variant?: ButtonVariant;
};

type ButtonAsButtonProps = BaseProps &
    ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
};

type ButtonAsLinkProps = BaseProps &
    AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
};

type ButtonProps = PropsWithChildren<ButtonAsButtonProps | ButtonAsLinkProps>;

export function Button({
                           children,
                           variant = 'primary',
                           className,
                           ...props
                       }: ButtonProps) {
    const buttonClassName = classNames(
        styles.button,
        styles[variant],
        className,
    );

    if ('href' in props && props.href) {
        return (
            <a className={buttonClassName} {...props}>
                {children}
            </a>
        );
    }

    // @ts-ignore
    return (
        <button className={buttonClassName} {...props}>
            {children}
        </button>
    );
}
