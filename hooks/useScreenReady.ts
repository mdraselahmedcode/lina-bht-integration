// // hooks/useScreenReady.ts
// import { useState, useEffect } from 'react';
// import { LayoutAnimation, Platform, UIManager } from 'react-native';

// // Enable LayoutAnimation for Android
// if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// interface UseScreenReadyProps {
//   dependencies?: any[];
//   delay?: number;
// }

// export const useScreenReady = ({ dependencies = [], delay = 100 }: UseScreenReadyProps = {}) => {
//   const [isRendering, setIsRendering] = useState(true);
//   const [renderError, setRenderError] = useState<string | null>(null);
//   const [isContentReady, setIsContentReady] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       try {
//         const allDepsReady = dependencies.every(dep => dep !== undefined && dep !== null);
        
//         if (allDepsReady) {
//           setIsRendering(false);
//           setTimeout(() => {
//             LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//             setIsContentReady(true);
//           }, 50);
//         } else {
//           throw new Error('Failed to initialize dependencies');
//         }
//       } catch (error) {
//         setRenderError('Failed to load screen. Please try again.');
//         setIsRendering(false);
//         setIsContentReady(true);
//       }
//     }, delay);

//     return () => clearTimeout(timer);
//   }, [...dependencies, delay]);

//   return {
//     isRendering,
//     renderError,
//     isContentReady,
//     setIsRendering,
//     setRenderError,
//     setIsContentReady,
//   };
// };


// hooks/useScreenReady.ts
import { useState, useEffect } from 'react';
import { LayoutAnimation, Platform, UIManager } from 'react-native';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface UseScreenReadyProps {
  dependencies?: any[];
  delay?: number;
  initialReady?: boolean; // New prop to control initial state
}

export const useScreenReady = ({ 
  dependencies = [], 
  delay = 100,
  initialReady = false // Default to false, but can be overridden
}: UseScreenReadyProps = {}) => {
  const [isRendering, setIsRendering] = useState(!initialReady);
  const [renderError, setRenderError] = useState<string | null>(null);
  const [isContentReady, setIsContentReady] = useState(initialReady);

  useEffect(() => {
    // If already ready, don't do anything
    if (initialReady) return;

    const timer = setTimeout(() => {
      try {
        const allDepsReady = dependencies.every(dep => dep !== undefined && dep !== null);
        
        if (allDepsReady) {
          setIsRendering(false);
          setTimeout(() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setIsContentReady(true);
          }, 50);
        } else {
          throw new Error('Failed to initialize dependencies');
        }
      } catch (error) {
        setRenderError('Failed to load screen. Please try again.');
        setIsRendering(false);
        setIsContentReady(true);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [...dependencies, delay, initialReady]);

  return {
    isRendering,
    renderError,
    isContentReady,
    setIsRendering,
    setRenderError,
    setIsContentReady,
  };
};