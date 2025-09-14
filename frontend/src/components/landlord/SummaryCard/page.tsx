export const SummaryCard = ({
  icon,
  label,
  value,
  link,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  link: string;
}) => (
  <div className="bg-white rounded-lg shadow p-4 w-full flex flex-col justify-between">
    <div className="flex items-center gap-2 text-gray-600">
      {icon}
      <span>{label}</span>
    </div>
    <div className="text-2xl font-bold text-green-700">{value}</div>
    <a href={link} className="text-sm text-green-600 hover:underline mt-2">
      View All
    </a>
  </div>
);
