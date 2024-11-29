import { ImageStyle } from 'react-native'
import React from 'react'
import Svg, { NumberProp, Path, LinearGradient, Rect, Defs, Stop } from 'react-native-svg'

interface LogoProps {
  width: NumberProp
  height: NumberProp
  style?: ImageStyle
}

export function Logo({ width, height, style }: LogoProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 150 300"
      fill="none"
      style={style}>
      <Rect width="150" height="300" fill="url(#gradient)" />
      <Path
        d="M64.5 200.5C58.3 193.946 50.38 184.598 46.14 187V303H16V162H51.66C56.96 162.354 62.21 167.11 67.5 173.087H73C78.14 168.075 83.78 162.764 88.5 162H125V303H94.86V186.5C93.14 182.968 84.26 192.758 75.5 201C71.9 202.088 69.32 202.595 64.5 200.5Z"
        fill="#2D3250"
      />
      <Path
        d="M67.5 173.087C62.21 167.11 56.96 162.354 51.66 162H16V303H46.14V187C50.38 184.598 58.3 193.946 64.5 200.5C69.32 202.595 71.9 202.088 75.5 201C84.26 192.758 93.14 182.968 94.86 186.5V303H125C125 303 125 274.8 125 162H88.5C83.78 162.764 78.14 168.075 73 173.087M67.5 173.087C69.31 173.646 71.12 173.432 73 173.087M67.5 173.087H73"
        stroke="#2D3250"
      />
      <Defs>
        <LinearGradient id="gradient" x1="72.5" y1="0" x2="72.5" y2="303" gradientUnits="userSpaceOnUse">
          <Stop offset="0.065" stopColor="#E57EF6" />
          <Stop offset="0.468" stopColor="#5D54B4" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}
