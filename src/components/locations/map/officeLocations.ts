import type { LocationData } from "./map.types";

export const brooklynLocation: LocationData = {
	name: "Brooklyn Office",
	streetAddress: "749 61st St, #303",
	city: "Brooklyn",
	state: "NY",
	zip: "11220",
	phone: "(718) 492-3500",
	phoneNum: 7184923500,
	mtaLines: ["n"],
	googleMapsLink:
		"https://www.google.com/maps/dir//Dr.+Bingjing+Z.+Roberts,+MD,+749+61st+St+%23303,+Brooklyn,+NY+11220/@40.6479822,-73.9964039,15z/data=!4m17!1m7!3m6!1s0x89c245492a15837b:0x8f84e0350c241104!2sDr.+Bingjing+Z.+Roberts,+MD!8m2!3d40.6356862!4d-74.0110481!16s%2Fg%2F1tmxggb_!4m8!1m0!1m5!1m1!1s0x89c245492a15837b:0x8f84e0350c241104!2m2!1d-74.0110481!2d40.6356862!3e3!5m1!1e2?hl=en&entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D",
};

export const manhattanLocation: LocationData = {
	name: "Manhattan Office",
	streetAddress: "185 Canal St, #306",
	mtaLines: ["b", "d", "j", "z", "n", "q", "r", "w", "6"],
	city: "Manhattan",
	state: "NY",
	zip: "10013",
	phone: "(212) 219-7786",
	phoneNum: 2122197786,
	googleMapsLink:
		"https://www.google.com/maps/dir//185+Canal+St,+New+York,+NY+10013/@40.6479822,-73.9964039,15z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x89c25a277823749f:0xbbc72dea01f73c0f!2m2!1d-73.9978147!2d40.7170735!5m1!1e2?hl=en&entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D",
};
