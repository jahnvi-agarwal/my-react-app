import { useState, useCallback, useRef } from 'react';

/**
 * useToast — custom hook for toast notifications.
 *
 * @returns {{ message, visible, showToast }}
 *   - message:   string to display in the toast
 *   - visible:   boolean controlling the "show" CSS class
 *   - showToast: (msg: string) => void — call to trigger a toast
 */
function useToast() {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  const showToast = useCallback((msg) => {
    // Clear any existing timer so rapid calls reset the duration
    clearTimeout(timerRef.current);
    setMessage(msg);
    setVisible(true);
    timerRef.current = setTimeout(() => setVisible(false), 3200);
  }, []);

  return { message, visible, showToast };
}

export default useToast;