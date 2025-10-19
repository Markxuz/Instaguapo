import FormalWearCard from "../cards/Formalwearcard";

const FormalWearSection = ({ title, items }) => {
  return (
    <div className="mb-12">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <button className="text-blue-600 hover:underline">Edit All</button>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <FormalWearCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FormalWearSection;
