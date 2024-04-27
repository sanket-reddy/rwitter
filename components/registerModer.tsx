interface registerProps {
  isOpen?: boolean;
  onClose?: () => void;
  type: string;
}

const RegisterModel: React.FC<registerProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) {
    return null;
  }
  if (type === "login") {
    return;
  }
};
