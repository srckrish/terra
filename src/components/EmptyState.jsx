import { Image } from 'lucide-react';

const EmptyState = ({
  title,
  description,
  actionText,
  actionOnClick,
  icon = 'Image',
  className = ''
}) => {
  // Map icon names to actual icons (simplified)
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Image': return <Image className="h-10 w-10 text-[#DBE4E2] mb-4" />;
      case 'Users': return <Users className="h-10 w-10 text-[#DBE4E2] mb-4" />;
      case 'MapPin': return <MapPin className="h-10 w-10 text-[#DBE4E2] mb-4" />;
      case 'Heart': return <Heart className="h-10 w-10 text-[#DBE4E2] mb-4" />;
      case 'DollarSign': return <DollarSign className="h-10 w-10 text-[#DBE4E2] mb-4" />;
      case 'Plus': return <Plus className="h-10 w-10 text-[#DBE4E2] mb-4" />;
      default: return <Image className="h-10 w-10 text-[#DBE4E2] mb-4" />;
    }
  };

  const Icon = getIcon(icon);

  return (
    <div className={`text-center py-12 ${className}`}>
      <Icon />
      <h2 className="text-xl font-bold text-[#10242A] mb-4">{title}</h2>
      <p className="text-[#4B6166] mb-6">{description}</p>
      {actionText && actionOnClick && (
        <button
          onClick={actionOnClick}
          className="px-4 py-2 bg-[#166F7C] text-white rounded-md hover:bg-[#0d5a63]"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;