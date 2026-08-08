import {
    type AnchorHTMLAttributes,
    type ButtonHTMLAttributes,
    type PropsWithChildren
} from 'react';

import styles from './Button.module.scss';
import { classNames } from "../../Lib/classNames.ts";

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

function isLinkProps(props: ButtonProps): props is PropsWithChildren<ButtonAsLinkProps> {
    return 'href' in props && props.href !== undefined;
}

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

    // Если это ссылка, TS внутри этого блока будет видеть ТОЛЬКО свойства ссылки
    if (isLinkProps(props)) {
        return (
            <a className={buttonClassName} {...props}>
                {children}
            </a>
        );
    }

    const {
        type = 'button',
        ...buttonProps
    } = props as ButtonAsButtonProps;

    return (
        <button
            className={buttonClassName}
            type={type}
            {...buttonProps}
        >
            {children}
        </button>
    );
}
