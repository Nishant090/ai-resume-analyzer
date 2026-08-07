import Card from "../ui/Card";

const AnalysisList = ({ title, items }) => {
  return (
    
      <Card>
        <p className="text-4xl font-semibold">{title}</p>
        {items.map((items, index) => {
          return (
            <p key={index} className="flex items-center gap-2 py-2">
              {items}{" "}
            </p>
          );
        })}
      </Card>
    
  );
};

export default AnalysisList;
