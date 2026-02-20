import * as React from 'react';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import { Context, Primitive, RovingFocus } from 'radix-ui/internal';
declare const createCheckboxGroupScope: Context.CreateScope;
type CheckboxGroupContextValue = {
    name?: string;
    required: boolean;
    disabled: boolean;
    value?: string[];
    onItemCheck(value: string): void;
    onItemUncheck(value: string): void;
};
type RovingFocusGroupProps = React.ComponentPropsWithoutRef<typeof RovingFocus.Root>;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface CheckboxGroupProps extends PrimitiveDivProps {
    name?: CheckboxGroupContextValue['name'];
    required?: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>['required'];
    disabled?: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>['disabled'];
    dir?: RovingFocusGroupProps['dir'];
    orientation?: RovingFocusGroupProps['orientation'];
    loop?: RovingFocusGroupProps['loop'];
    defaultValue?: string[];
    value?: CheckboxGroupContextValue['value'];
    onValueChange?: (value: string[]) => void;
}
declare const CheckboxGroup: React.ForwardRefExoticComponent<CheckboxGroupProps & React.RefAttributes<HTMLDivElement>>;
type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;
interface CheckboxGroupItemProps extends Omit<CheckboxProps, 'checked' | 'defaultChecked' | 'onCheckedChange' | 'name'> {
    value: string;
}
declare const CheckboxGroupItem: React.ForwardRefExoticComponent<CheckboxGroupItemProps & React.RefAttributes<HTMLButtonElement>>;
type CheckboxIndicatorProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Indicator>;
interface CheckboxGroupIndicatorProps extends CheckboxIndicatorProps {
}
declare const CheckboxGroupIndicator: React.ForwardRefExoticComponent<CheckboxGroupIndicatorProps & React.RefAttributes<HTMLSpanElement>>;
declare const Root: React.ForwardRefExoticComponent<CheckboxGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const Item: React.ForwardRefExoticComponent<CheckboxGroupItemProps & React.RefAttributes<HTMLButtonElement>>;
declare const Indicator: React.ForwardRefExoticComponent<CheckboxGroupIndicatorProps & React.RefAttributes<HTMLSpanElement>>;
export { createCheckboxGroupScope, CheckboxGroup, CheckboxGroupItem, CheckboxGroupIndicator, Root, Item, Indicator, };
export type { CheckboxGroupProps, CheckboxGroupItemProps, CheckboxGroupIndicatorProps };
//# sourceMappingURL=checkbox-group.primitive.d.ts.map