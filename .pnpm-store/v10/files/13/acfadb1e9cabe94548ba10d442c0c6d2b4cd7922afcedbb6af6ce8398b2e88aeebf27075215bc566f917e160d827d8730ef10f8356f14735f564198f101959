import * as React from 'react';
import { Avatar as AvatarPrimitive } from 'radix-ui';
import { avatarPropDefs } from './avatar.props.js';
import type { MarginProps } from '../props/margin.props.js';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';
interface AvatarProps extends MarginProps, AvatarImplProps {
}
declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLImageElement>>;
type AvatarOwnProps = GetPropDefTypes<typeof avatarPropDefs>;
interface AvatarImplProps extends ComponentPropsWithout<typeof AvatarPrimitive.Image, RemovedProps>, AvatarOwnProps {
    fallback: NonNullable<AvatarOwnProps['fallback']>;
}
export { Avatar };
export type { AvatarProps };
//# sourceMappingURL=avatar.d.ts.map