import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

export default function AllTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  console.log(tasks);

  useEffect(() => {
    gettasks();
  }, []);

  const gettasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/tasks");
      const data = await response.json();
      setTasks(data.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching tasks");
      setLoading(false);
    }
  };

  const handleEditNavigate = (post) => {
    navigate(`/task/${post._id}`);
  };

  const deleteTask = async (post) => {
    try {
      setLoading(true);
      await fetch(`http://localhost:5000/task/${post._id}`, {
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

  const handleDelete = async (post) => {
    toast((t) => (
      <span>
        Delete Taks
        <button
          className="bg-red-300 px-3 py-2 mx-2 rounded-xl"
          onClick={() => {
            try {
              deleteTask(post);
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
    <div className="bg-white wrapper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto text-center  lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Track All Tasks
          </h2>
          <p className="mt-2 text-lg mb-3 text-gray-600">
            Personalized to your needs and preferences.
          </p>

          <Link
            to="/AddTask"
            className="bg-gray-900 w-full text-white rounded-md 
              px-20 py-2 text-sm font-medium"
          >
            Add Task
          </Link>
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tasks.map((post) => (
            <article
              key={post._id}
              // className="flex max-w-xl flex-col items-start justify-between border border-gray-400 bg-slate-100 rounded-2xl p-4 "
              className="relative group max-w-xl flex flex-col items-start justify-between border border-gray-400 bg-slate-100 rounded-2xl p-4 transition-transform duration-300 transform hover:scale-105"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time className="text-gray-500">
                  Task Added Time: {new Date(post.timestamp).toLocaleString()}
                </time>
                <a
                  // href={post.}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {post.priority}
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <Link to={`/task/${post._id}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  <Link to={`/task/${post._id}`}>{post.description}</Link>
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  src={post.author.imageUrl}
                  alt=""
                  className="h-10 w-10 rounded-full bg-gray-50"
                />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <a href={post.author.href}>
                      <span className="absolute inset-0" />
                      {post.author.name}
                    </a>
                  </p>
                  <p className="text-gray-600">{post.author.role}</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={() => handleEditNavigate(post)}>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-green-500 mr-2 cursor-pointer"
                  />
                </button>
                <button onClick={() => handleDelete(post)}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-500 cursor-pointer"
                  />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
