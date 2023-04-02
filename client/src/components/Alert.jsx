import { useAppContext } from "../context/AppContext";

const Alert = () => {
  const { alertType, alertText } = useAppContext();
  return (
    <>
      <div
        className={
          alertType == "success"
            ? "flex w-full py-2 px-2 rounded-md text-sm bg-green-300"
            : "flex w-full py-2 px-2 rounded-md text-sm bg-red-300"
        }
      >
        <h1>{alertText}</h1>
      </div>
    </>
  );
};

export default Alert;
