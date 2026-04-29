import { useEffect, useRef, RefObject } from "react";

export function useOutsideClick<T extends HTMLElement>(callback: () => void): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Jika ref ada dan yang diklik BUKAN bagian dari elemen tersebut
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    // Tambahkan event listener saat mount
    document.addEventListener("mousedown", handleClickOutside);
    
    // Bersihkan event listener saat unmount (cleanup)
    return () => {
      document.remove("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
}