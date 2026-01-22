import { ArrowLeft } from 'lucide-react';

const PageHeader = ({ title, onBack }) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <button
        onClick={onBack}
        className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer"
      >
        <ArrowLeft size={24} />
      </button>
      <h1 className="font-extrabold text-2xl">{title}</h1>
    </div>
  );
};

export default PageHeader;
