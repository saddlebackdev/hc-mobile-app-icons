import React, { FC, SVGProps, PropsWithChildren, HTMLAttributes } from 'react';

type IIconComponent = FC<SVGProps<SVGSVGElement>>;
export interface IIconBaseProps
  extends PropsWithChildren<HTMLAttributes<HTMLSpanElement>> {}
export type IIconComponentType = FC<IIconBaseProps>;

function IconBase(props: IIconBaseProps) {
  const { children, style, ...rest } = props;
  return (
    <span
      style={{ display: 'inline-flex', alignItems: 'center', ...style }}
      {...rest}
    >
      {children}
    </span>
  );
}

export default function generateIcon(IconComponent: IIconComponent) {
  const Icon: IIconComponentType = (props: IIconBaseProps) => {
    return (
      <IconBase {...props}>
        <IconComponent fill="currentColor" />
      </IconBase>
    );
  };
  return Icon;
}