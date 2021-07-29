import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { ListChildComponentProps } from 'react-window';
import { Company } from '../types/types';

const ListItem: React.FC<ListChildComponentProps<Company[]>> = ({
  style,
  index,
  data,
}) => {
  const item = data[index];

  if (!item) {
    return (
      <div style={style} className="flex items-center justify-center">
        <span>LOADING...</span>
      </div>
    );
  }

  return (
    <div style={style} className="flex p-4">
      <Image src={item.logo} alt="logo" width={88} height={88} />
      <div className="flex flex-1 flex-col justify-between px-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">
            {item.id}: {item.name}
          </h3>
          <p className="text-sm">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="pr-1" />
            <span className="text-gray-500">{item.city}</span>
          </p>
        </div>
        <p>
          {item.categories.map((category, i) => (
            <span key={i} className="pr-2 text-sm">
              <FontAwesomeIcon icon={faWrench} className="pr-1" />
              {category}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default ListItem;
