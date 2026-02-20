import * as React from 'react';
import { Progress as ProgressPrimitive } from 'radix-ui';
import { progressPropDefs } from './progress.props.js';
import type { MarginProps } from '../props/margin.props.js';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';
type ProgressOwnProps = GetPropDefTypes<typeof progressPropDefs>;
interface ProgressProps extends ComponentPropsWithout<typeof ProgressPrimitive.Root, RemovedProps | 'children'>, MarginProps, ProgressOwnProps {
    duration?: `${number}s` | `${number}ms`;
}
declare const Progress: React.ForwardRefExoticComponent<Omit<ProgressProps, "ref"> & React.RefAttributes<any>>;
export { Progress };
export type { ProgressProps };
//# sourceMappingURL=progress.d.ts.map