export default function EditProfile({ onClose  } : {onClose : ()=> void} ) {
    return (
      <div className="fixed min-h-screen w-full flex items-center justify-center inset-0 z-50 bg-black bg-opacity-50">
        <div className="bg-gray-100 border-b-2 w-11/12 md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-black">Edit Profile</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Add a new Profile Picture</label>
              <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
            </div>
            <div>
              <label className="block text-gray-700">Add a new Cover Photo</label>
              <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
            </div>
          
            <div>
              <label className="block text-gray-700">Change your Bio</label>
              <input
                type="email"

                className="w-full h-[100px] p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
