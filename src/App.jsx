import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(tasks);

  useEffect(() => {
    gettasks();
  }, []);

  const gettasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/tasks");
      const data = await response.json();
      const sortTasks = data.data.sort((a, b) => b.timestamp - a.timestamp);
      const recentTasks = sortTasks.slice(0, 6);
      setTasks(recentTasks);
      setLoading(false);
    } catch (error) {
      setError("Error fetching tasks");
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading..</p>;
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto text-center max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Recent Added Tracking Task
          </h2>
          <p className="mt-2 text-lg  text-gray-600">
            you can update and delete your assigned tasks
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tasks.map((post) => (
            <article
              key={post._id}
              className="flex max-w-xl flex-col items-start justify-between border border-gray-400 bg-slate-100 rounded-2xl p-4 "
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
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
