import { Person } from '../types';

interface AddPersonModalProps {
  onClose: () => void;
  onAdd: (person: Omit<Person, 'id' | 'userId' | 'createdAt' | 'groupIds'>) => void;
}

declare const AddPersonModal: React.FC<AddPersonModalProps>;
export default AddPersonModal; 