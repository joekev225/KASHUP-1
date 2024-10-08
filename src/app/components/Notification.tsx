import { useState, useEffect } from 'react';

type NotificationProps = {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
};

export default function Notification({ message, type, duration = 5000 }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-4 py-2 rounded shadow-lg`}>
      {message}
    </div>
  );
}