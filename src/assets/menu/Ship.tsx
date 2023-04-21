import Svg, { SvgProps, Path, Polygon, G, Rect } from 'react-native-svg';

export const Ship = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 512 512" {...props}>
      <Path
        fill="#C8F4DE"
        d="M257.129,12.259L256,11.13l-1.129,1.129c-27.784,27.785-43.393,65.468-43.393,104.76v339.67
	c0,13.434,7.59,25.716,19.606,31.723L256,500.869l24.915-12.458c12.016-6.007,19.606-18.288,19.606-31.723v-245.21v-66.783v-27.677
	C300.522,77.727,284.914,40.044,257.129,12.259z"
      />
      <Path
        fill="#FFFE9F"
        d="M300.522,456.348v0.345c0,13.434-7.591,25.711-19.601,31.722L256,500.869l-24.921-12.455
	c-12.01-6.01-19.601-18.287-19.601-31.722v-0.345H300.522z"
      />
      <Rect x="211.478" y="411.826" fill="#87DFD6" width="89.043" height="44.522" />
      <G>
        <Polygon fill="#4A7DBA" points="500.87,456.348 300.522,456.348 300.522,345.043 500.87,389.565 	" />
        <Polygon fill="#4A7DBA" points="11.13,456.348 211.478,456.348 211.478,345.043 11.13,389.565 	" />
      </G>
      <Path
        d="M306.699,168.837c-0.601-0.401-1.247-0.746-1.926-1.024c-0.668-0.278-1.368-0.501-2.08-0.634
	c-1.436-0.289-2.916-0.289-4.341,0c-0.712,0.134-1.414,0.356-2.093,0.634c-0.669,0.278-1.313,0.623-1.914,1.024
	c-0.613,0.401-1.181,0.868-1.693,1.38s-0.979,1.08-1.38,1.692c-0.4,0.601-0.746,1.247-1.024,1.926
	c-0.278,0.668-0.501,1.369-0.633,2.081c-0.146,0.712-0.223,1.447-0.223,2.17c0,0.723,0.077,1.458,0.223,2.17
	c0.132,0.712,0.355,1.414,0.633,2.093c0.278,0.668,0.624,1.313,1.024,1.914c0.401,0.612,0.868,1.18,1.38,1.692
	s1.08,0.979,1.693,1.38c0.601,0.401,1.245,0.746,1.914,1.024c0.679,0.278,1.38,0.501,2.093,0.634
	c0.712,0.145,1.447,0.223,2.17,0.223c0.722,0,1.458-0.078,2.17-0.223c0.712-0.134,1.414-0.356,2.08-0.634
	c0.679-0.278,1.325-0.623,1.926-1.024c0.612-0.401,1.18-0.868,1.692-1.38c0.513-0.512,0.981-1.08,1.38-1.692
	c0.401-0.601,0.746-1.247,1.024-1.914c0.278-0.679,0.501-1.38,0.634-2.093c0.145-0.712,0.223-1.447,0.223-2.17
	c0-2.927-1.191-5.799-3.262-7.869C307.878,169.706,307.311,169.238,306.699,168.837z"
      />
      <Path
        d="M503.284,378.701l-13.545-3.011V144.696c0-6.147-4.984-11.13-11.13-11.13s-11.13,4.983-11.13,11.13v226.048l-66.783-14.84
	V233.739c0-6.147-4.984-11.13-11.13-11.13c-6.146,0-11.13,4.983-11.13,11.13v117.217l-66.783-14.84V211.478
	c0-6.147-4.984-11.13-11.13-11.13s-11.13,4.983-11.13,11.13v133.565v55.652h-66.783v-55.652V117.014
	c0-33.282,11.788-64.754,33.391-89.649c21.603,24.895,33.391,56.367,33.391,89.649v27.681c0,6.147,4.984,11.13,11.13,11.13
	s11.13-4.983,11.13-11.13v-27.681c0-42.544-16.57-82.543-46.658-112.63L263.87,3.26c-4.348-4.346-11.393-4.346-15.742,0
	l-1.124,1.124c-30.087,30.087-46.657,70.086-46.657,112.63v219.101l-66.783,14.84V233.739c0-6.147-4.984-11.13-11.13-11.13
	c-6.146,0-11.13,4.983-11.13,11.13v122.163l-66.783,14.841V144.696c0-6.147-4.984-11.13-11.13-11.13s-11.13,4.983-11.13,11.13
	V375.69L8.716,378.7C3.623,379.832,0,384.348,0,389.565v66.783c0,6.147,4.984,11.13,11.13,11.13h190.487
	c3.12,13.261,11.903,24.595,24.486,30.893l24.921,12.455c1.566,0.782,3.271,1.174,4.976,1.174c1.705,0,3.409-0.392,4.976-1.174
	l24.927-12.457c12.578-6.295,21.362-17.629,24.48-30.89H500.87c6.146,0,11.13-4.983,11.13-11.13v-66.783
	C512,384.348,508.377,379.832,503.284,378.701z M289.391,422.956v22.261h-66.783v-22.261H289.391z M22.261,398.494l13.357-2.968
	c0.017-0.003,0.032-0.008,0.049-0.011l88.999-19.778c0.012-0.002,0.024-0.006,0.037-0.009l75.646-16.808v52.906v33.391H22.261
	V398.494z M275.945,478.458L256,488.427l-19.939-9.966c-4.868-2.435-8.643-6.32-10.94-10.982h61.759
	C284.583,472.141,280.81,476.024,275.945,478.458z M489.739,445.217H311.652v-33.391v-52.907l75.645,16.81
	c0.012,0.002,0.025,0.006,0.037,0.009l88.999,19.778c0.017,0.003,0.032,0.008,0.049,0.011l13.357,2.968v46.722H489.739z"
      />
      <Path
        d="M244.87,122.435v89.043c0,6.147,4.984,11.13,11.13,11.13s11.13-4.983,11.13-11.13v-89.043c0-6.147-4.984-11.13-11.13-11.13
	S244.87,116.287,244.87,122.435z"
      />
    </Svg>
  );
};
