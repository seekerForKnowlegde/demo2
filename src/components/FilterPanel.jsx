export default function FilterPanel() {
  return (
    <section className="mt-6 flex flex-wrap items-end gap-4">
      {/* <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Aviation Class</label>
        <select className="border rounded px-3 py-1 text-sm">
          <option>All</option>
          <option>Commercial</option>
          <option>Private</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Marine Class</label>
        <select className="border rounded px-3 py-1 text-sm">
          <option>All</option>
          <option>Cargo</option>
          <option>Hull</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Underwriting Year</label>
        <select className="border rounded px-3 py-1 text-sm">
          <option>2024</option>
          <option>2023</option>
          <option>2022</option>
        </select>
      </div> */}

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Aviation Class"
          className="w-48 px-3 py-2 text-sm border border-gray-400 rounded-md shadow-sm placeholder-gray-600 font-bold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
        <input
          type="text"
          placeholder="Marine Class"
          className="w-48 px-3 py-2 text-sm border border-gray-400 rounded-md shadow-sm placeholder-gray-600 font-bold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
        <input
          type="text"
          placeholder="Underwriting Year 2025"
          className="w-48 px-3 py-2 text-sm border border-gray-400 rounded-md shadow-sm placeholder-gray-600 font-bold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
      </div>
      {/* <button className="ml-auto bg-red-600 text-white px-6 py-2 rounded text-sm hover:bg-red-700">
        SUBMIT
      </button> */}
    </section>
  );
}
