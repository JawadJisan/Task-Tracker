/* eslint-disable react/prop-types */
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Filtered = ({
  searchTitle,
  setSearchTitle,
  searchPriority,
  setSearchPriority,
  searchCompleted,
  setSearchCompleted,
}) => {
  const handleReset = () => {
    setSearchTitle("");
    setSearchPriority("");
    setSearchCompleted("");
  };
  return (
    <>
      <div className="bg-gray-200 p-2 rounded-xl mt-5 mb-5">
        <div className="mx-auto p-2 text-center  lg:mx-0">
          <h2 className="text-2xl mb-2 font-bold tracking-tight text-gray-600 sm:text-4xl">
            Filtered Tasks
          </h2>
        </div>
        <div className="flex items-center px-10 py-3 justify-between ">
          <div className="relative mt-2 rounded-md shadow-sm">
            <label
              htmlFor="search"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Search Title
            </label>
            <input
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              type="text"
              name="search"
              id="search"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Search"
            />
          </div>
          <div className="flex items-center">
            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Priority
              </label>
              <div className="mt-2">
                <select
                  id="priority"
                  value={searchPriority}
                  onChange={(e) => setSearchPriority(e.target.value)}
                  name="priority"
                  autoComplete="priority"
                  className="block w-full rounded-md border-0
                px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Medium</option>
                  <option>High</option>
                  <option>Low</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="completed"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Completed
              </label>
              <div className="mt-2">
                <select
                  id="completed"
                  value={searchCompleted}
                  onChange={(e) => setSearchCompleted(e.target.value)}
                  name="completed"
                  autoComplete="completed"
                  className="block w-full rounded-md border-0
                px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>False</option>
                  <option>True</option>
                </select>
              </div>
            </div>
            <div>
              <button className="p-3" onClick={handleReset}>
                <FontAwesomeIcon
                  icon={faRefresh}
                  className="text-red-500 cursor-pointer"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filtered;
