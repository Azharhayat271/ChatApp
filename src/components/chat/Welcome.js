import { WelcomeSVG } from "../../utils/WelcomeSVG";
import Welcomes from "./../../assests/active-male-specialist-working-in-support-service.gif"

export default function Welcome() {
  return (
    <div className="lg:col-span-2 lg:block bg-white dark:bg-gray-900">
      <div className="pl-5">
        <img className="chatimage" src={Welcomes} height={100}></img>
        <div className="text-center">
          <h2 className="text-xl text-gray-500 dark:text-gray-400">
            Select a Chat to Start Messaging
          </h2>
        </div>
      </div>
    </div>
  );
}
