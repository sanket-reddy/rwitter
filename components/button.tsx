interface ButtonProps {
  content: string;
  secondary?: boolean;
  onClick?: () => void;
  fullWidth?: boolean;
}
export default function Button(props: ButtonProps) {
  const buttonClass = props?.secondary
    ? "bg-white text-white hover:bg-gray-200 p-2 w-full rounded-md"
    : "bg-blue-600  rounded-md hover:bg-blue-800 shadow p-2 w-full";
  return (
    <div>
      <button
        onClick={props.onClick}
        className={`rounded-full shadow p-2  ${
          props.secondary
            ? "bg-black text-white border  border-black hover:bg-neutral-600"
            : "bg-blue-500  border-sky-500 hover:bg-blue-700 "
        }
        ${props.fullWidth ? "w-full" : "w-auto"}  `}
      >
        {props.content}
      </button>
    </div>
  );
}
