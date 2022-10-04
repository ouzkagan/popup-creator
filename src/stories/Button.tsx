/* eslint-disable @typescript-eslint/no-unused-vars */
// import './button.scss';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  padding?: string;
  /**
   * How large should the button be?
   */
  width?: string;
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  backgroundColor,
  padding,
  width,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'navbar' : 'storybook-button--secondary';

  return (
    <div>
      <button
        type="button"
        className={`whitespace-nowrap rounded-xl py-2 px-5 text-center text-base font-medium leading-5 tracking-tight text-white ${backgroundColor} ${padding} ${width}`}
        {...props}
      >
        Try for free
      </button>

      {/* <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button> */}
    </div>
  );
};
