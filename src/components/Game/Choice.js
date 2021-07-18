import { useColor } from "../ColorContext";
const Choice = ({children}) => {

  const color = useColor()
  return <button className={`nm-flat-${color}-sm hover:nm-inset-${color} rounded-xl outline-none`}>{children}</button>;
}

export default Choice
