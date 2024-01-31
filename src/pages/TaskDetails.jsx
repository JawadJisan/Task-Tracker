import { useParams } from "react-router-dom";

const TaskDetails = () => {
  const { id } = useParams();
  console.log(id);
  return <div>TaskDetails</div>;
};

export default TaskDetails;
