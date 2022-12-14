// Based on: https://devtrium.com/posts/how-keyboard-shortcut
import { useCallback, useEffect, useRef } from 'react';

const useKeyUp = (
  keys: string[],
  eventHandler: (event: KeyboardEvent) => void,
  node: Node | null = null
) => {
  // implement the callback ref pattern
  const eventHandlerRef = useRef(eventHandler);

  useEffect(() => {
    eventHandlerRef.current = eventHandler;
  }, [eventHandler]);

  // handle what happens on key press
  const handleKeyUp = useCallback(
    (event: Event) => {
      if (!(event instanceof KeyboardEvent)) {
        return;
      }

      // check if one of the key is part of the ones we want
      if (keys.some((key) => event.key === key)) {
        eventHandlerRef.current(event);
      }
    },
    [keys]
  );

  useEffect(() => {
    // target is either the provided node or the document
    const targetNode = node ?? document;
    // attach the event listener
    targetNode?.addEventListener('keyup', handleKeyUp);

    // remove the event listener
    return () => targetNode?.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp, node]);
};

export default useKeyUp;
