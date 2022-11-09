


export const Button = (props: {buttonText:string}) => {

    return (
        <button
        type="submit"
        className="w-full flex items-center justify-center py-3 px-5 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
      >
        {props.buttonText}
      </button>
    )
}