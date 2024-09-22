import {ComponentProps} from "react";

type ButtonPropsType = ComponentProps<'button'> & {
	// title: string
	// onClick?:()=> void
	// className?: string
}
// {title, onClick, className}
export const Button = (props: ButtonPropsType) => {
	return (
		<button type={"button"} {...props}>{props.children}</button>
	)
}
