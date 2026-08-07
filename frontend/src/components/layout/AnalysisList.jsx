import Card from "../ui/Card";

const AnalysisList = ({ title, items = [] }) => {
  return (
    <Card className="max-w-none w-full">
      <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
        {title}
      </h3>

      {items.length === 0 ? (
        <p className="mt-3 text-sm text-slate-400 italic">
          Nothing to show here.
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-slate-100">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 py-2.5 text-sm sm:text-base text-slate-700"
            >
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default AnalysisList;