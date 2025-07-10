import { usePrompt } from "./PromptContext";
function getLiteralMeaning(field, op, value) {
  const opMap = {
    "==": "is",
    "!=": "is not equal to",
    ">": "is greater than",
    ">=": "is greater than or equal to",
    "<": "is less than",
    "<=": "is less than or equal to",
    in: "is in",
    "not in": "is not in",
  };

  const readableOp = opMap[op] || op;
  return `${field} ${readableOp} ${value}`;
}
export default function FilterPanel() {
  const { promptData } = usePrompt();
  // const filters = promptData?.filters;
  const filtersObj = promptData?.filters;

  const filtersArray = Object.entries(filtersObj).map(([field, details]) => ({
    field,
    ...details,
  }));
  console.log("filtersArray", filtersArray);
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
        {filtersArray.map((f, idx) => (
          <input
            type="text"
            key={idx}
            // placeholder={`${f.field} ${f.op} ${f.value}`}
            value={getLiteralMeaning(f.field, f.op, f.value)}
            className="w-auto px-3 py-2 text-sm border border-gray-400 rounded-md shadow-sm placeholder-gray-600 font-bold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        ))}
        {/* <input
          type="text"
          placeholder="Marine Class"
          className="w-48 px-3 py-2 text-sm border border-gray-400 rounded-md shadow-sm placeholder-gray-600 font-bold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
        <input
          type="text"
          placeholder="Underwriting Year 2025"
          className="w-48 px-3 py-2 text-sm border border-gray-400 rounded-md shadow-sm placeholder-gray-600 font-bold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        /> */}
      </div>
      {/* <button className="ml-auto bg-red-600 text-white px-6 py-2 rounded text-sm hover:bg-red-700">
        SUBMIT
      </button> */}
    </section>
  );
}
