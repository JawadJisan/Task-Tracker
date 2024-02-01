import { useNavigate, useParams } from "react-router-dom";

import taskIMG from "../assets/task.jpg";

import {
  CloudArrowUpIcon,
  LockClosedIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EditForm from "../components/EditForm";
import Loading from "../components/Loading";

export default function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const gettasks = async () => {
    try {
      const response = await fetch(
        `https://task-tracker-server-psi.vercel.app/task/${id}`
      );
      const data = await response.json();
      setTask(data.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching tasks");
      setLoading(false);
    }
  };

  useEffect(() => {
    gettasks();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const deleteTask = async () => {
    try {
      setLoading(true);
      await fetch(`https://task-tracker-server-psi.vercel.app/task/${id}`, {
        method: "DELETE",
      });
      setLoading(false);
      toast.success("Task Deleted Successfully");
      navigate("/AllTasks");
    } catch (error) {
      setLoading(true);
      setError("Error fetching tasks");
      setLoading(false);
      toast.error("coudnt delete the task");
    }
  };

  const handleDelete = async () => {
    toast((t) => (
      <span>
        Delete Taks
        <button
          className="bg-red-300 px-3 py-2 mx-2 rounded-xl"
          onClick={() => {
            try {
              deleteTask();
              toast.dismiss(t.id);
            } catch (error) {
              toast.dismiss(t.id);
            }
          }}
        >
          Delete
        </button>
      </span>
    ));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
          />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Your Task Details
              </h1>

              <div
                className={`${
                  isEditing
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100 pointer-events-auto"
                }`}
              >
                <button
                  onClick={handleEditClick}
                  className="bg-indigo-500 hover:bg-indigo-600 text-black py-2 px-3 rounded-full mr-4 transition-all duration-300 transform scale-100 hover:scale-110"
                >
                  <p className="flex gap-x-3">
                    <PencilSquareIcon
                      className="mt-1 h-5 w-5 flex-none text-white"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold text-gray-900">
                        Edit
                      </strong>
                    </span>
                  </p>
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-full transition-all duration-300 transform scale-100 hover:scale-110"
                >
                  <p className="flex gap-x-3">
                    <TrashIcon
                      className="mt-1 h-5 w-5 flex-none text-white"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold text-gray-900">
                        Delete
                      </strong>
                    </span>
                  </p>
                </button>
              </div>
            </div>

            <p className="text-base mt-10 font-semibold leading-7 text-indigo-600">
              {task.title}
            </p>

            <p className="mt-6 text-xl leading-8 text-gray-700">
              {task.description}
            </p>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          {/* <EditForm /> */}
          {isEditing ? (
            <EditForm task={task} setIsEditing={setIsEditing} id={id} />
          ) : (
            <div className="relative">
              <img
                className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                src={taskIMG}
                alt=""
              />
            </div>
          )}
        </div>

        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <CloudArrowUpIcon
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Completed:
                    </strong>{" "}
                    <span className="bg-gray-300 px-10 py-2 rounded-md ml-10">
                      {task.completed ? "Yes" : "No"}
                    </span>
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <LockClosedIcon
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Priority
                    </strong>{" "}
                    <span className="bg-gray-300 px-10 py-2 rounded-md ml-10">
                      {task.priority}
                    </span>
                  </span>
                </li>
              </ul>

              {/* <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                No server? No problem.
              </h2>
              <p className="mt-6">
                Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam
                consequat in. Convallis arcu ipsum urna nibh. Pharetra,
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
