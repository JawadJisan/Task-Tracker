import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

export default function AddTask() {
  const { user } = useContext(AuthContext);

  console.log(user);
  const initialFormData = {
    title: "",
    description: "",
    priority: "Medium",
    compleated: "False",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormErrors({
      ...formErrors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    if (!formData.title) {
      errors.title = "Title is required";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Form submission logic (you can replace this with your actual API call or state update logic)
      console.log("Form Data:", formData);

      const updatedFormData = {
        ...formData,
        author: {
          email: user.email,
          imageUrl: user.photoURL,
          name: user.displayName,
          role: "user",
        },
      };

      console.log("updatedFormData Data:", updatedFormData);

      // Reset the form on successful submission
      setFormData(initialFormData);
      setIsFormSubmitted(true);
    }
  };

  useEffect(() => {
    // Perform any additional logic after form submission
    if (isFormSubmitted) {
      // Reset the form state after a delay (you can adjust the delay as needed)
      const resetForm = setTimeout(() => {
        setIsFormSubmitted(false);
      }, 3000);

      // Cleanup the timeout on component unmount or form resubmission
      return () => clearTimeout(resetForm);
    }
  }, [isFormSubmitted]);
  return (
    <form className="wrapper" onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base text-center font-semibold leading-7 text-gray-900">
            Add New Task and Track Tour Tasks using Task Tracker
          </h2>
          <p className="mt-1 text-sm leading-6 text-center text-gray-600">
            Get and modified your personilized task for you and your team
          </p>

          <div className="sm:col-span-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                required
                id="title"
                name="title"
                type="text"
                autoComplete="title"
                value={formData.title}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  required
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write Description abourt Tour Tasks
              </p>
            </div>

            {/* <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/*  */}

            <div className="sm:col-span-3">
              <label
                htmlFor="priority"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Priority
              </label>
              <div className="mt-2">
                <select
                  rows={3}
                  id="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  name="priority"
                  autoComplete="priority"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Medium</option>
                  <option>High</option>
                  <option>Low</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="compleated"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Compleated
              </label>
              <div className="mt-2">
                <select
                  value={formData.compleated}
                  onChange={handleChange}
                  rows={3}
                  id="compleated"
                  name="compleated"
                  autoComplete="compleated"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>False</option>
                  <option>True</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Add Task
      </button>
    </form>
  );
}
