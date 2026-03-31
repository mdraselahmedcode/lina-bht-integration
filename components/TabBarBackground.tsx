// components/TabBarBackground.tsx
import * as React from 'react';
import Svg, {
  Path,
  G,
  Defs,
  Filter,
  FeFlood,
  FeColorMatrix,
  FeMorphology,
  FeOffset,
  FeGaussianBlur,
  FeComposite,
  FeBlend,
} from 'react-native-svg';

export default function TabBarBackground({ width = 448, height = 123 }) {
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <G filter="url(#filter0_d_321_772)">
        <Path
          d={`M4 26.9629H114H159.54C165.375 26.9629 170.747 30.1394 173.559 35.2522L188.951 63.2381C204.148 90.8691 243.852 90.8691 259.049 63.2381L274.441 35.2522C277.253 30.1394 282.625 26.9629 288.46 26.9629H334H444V114.044H4V26.9629Z`}
          fill="#DFD4C7"
        />
        {/* Add all the other paths from your SVG here */}
      </G>
      <Defs>
        <Filter
          id="filter0_d_321_772"
          x="0"
          y="1.46289"
          width={width}
          height={height - 8.5}
          filterUnits="userSpaceOnUse">
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <FeOffset dy="-2" />
          <FeGaussianBlur stdDeviation="2" />
          <FeComposite in2="hardAlpha" operator="out" />
          <FeColorMatrix
            type="matrix"
            values="0 0 0 0 0.941176 0 0 0 0 0.901961 0 0 0 0 0.847059 0 0 0 1 0"
          />
          <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_321_772" />
          <FeBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_321_772"
            result="shape"
          />
        </Filter>
      </Defs>
    </Svg>
  );
}
