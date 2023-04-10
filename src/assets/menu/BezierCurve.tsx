import Svg, { SvgProps, Path, G } from 'react-native-svg';

export const BezierCurve = (props: SvgProps) => {
  return (
    <Svg fill="#000000" height="80px" width="80px" viewBox="0 0 512 512">
      <G>
        <G>
          <Path
            d="M503.467,0h-51.2c-4.71,0-8.533,3.814-8.533,8.533v51.2c0,4.719,3.823,8.533,8.533,8.533h16.077
			c-15.027,136.132-31.095,243.354-75.81,275.678V332.8c0-4.719-3.823-8.533-8.533-8.533h-51.2c-4.71,0-8.533,3.814-8.533,8.533
			v9.207c-24.226-20.591-47.59-60.45-70.298-99.26c-22.485-38.426-43.793-74.795-66.236-93.269V128c0-4.719-3.823-8.533-8.533-8.533
			H128c-4.71,0-8.533,3.814-8.533,8.533v20.326c-45.833,25.207-73.916,114.697-93.005,295.407H8.533
			c-4.71,0-8.533,3.814-8.533,8.533v51.2C0,508.186,3.823,512,8.533,512h51.2c4.71,0,8.533-3.814,8.533-8.533v-51.2
			c0-4.719-3.823-8.533-8.533-8.533H43.622c16.734-157.124,41.054-245.598,75.844-274.765V179.2c0,4.719,3.823,8.533,8.533,8.533
			h51.2c4.71,0,8.533-3.814,8.533-8.533v-5.973c16.614,18.56,33.664,47.667,51.499,78.14
			c26.539,45.363,53.948,92.117,85.035,111.829V384c0,4.719,3.823,8.533,8.533,8.533H384c4.71,0,8.533-3.814,8.533-8.533v-20.096
			c58.539-29.158,75.981-141.21,92.979-295.637h17.954c4.71,0,8.533-3.814,8.533-8.533v-51.2C512,3.814,508.177,0,503.467,0z
			 M51.2,460.8v34.133H17.067V460.8H51.2z M170.667,170.667h-34.133v-34.133h34.133V170.667z M375.467,375.467h-34.133v-34.133
			h34.133V375.467z M494.933,51.2H460.8V17.067h34.133V51.2z"
          />
        </G>
      </G>
    </Svg>
  );
};
