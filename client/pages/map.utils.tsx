import axios from 'axios'
import { Loader } from '@googlemaps/js-api-loader'

interface Coordinates {
	position: {
		lat: Number
		lng: Number
	}
}

interface Marker {
	position: {
		lat: Number
		lng: Number
	}
}

interface Circle {
	strokeColor: string
	strokeOpacity: number
	strokeWeight: number
	fillColor: string
	fillOpacity: number
	map: google.map.Maps
	center: number
	radius: number
}
const API_KEY: any = process.env.NEXT_PUBLIC_GMAPS_API
const loader = new Loader({
	apiKey: API_KEY,
	version: 'weekly',
})

let map: google.maps.Map
let markers: Marker[] = []
let circles: Circle[] = []

function sendQueryDetails(range: number, magnitude: number) {
	const QUERYENDPOINT = 'http://localhost:3005/map/query'
	axios
		.post(QUERYENDPOINT, {
			range: range,
			magnitude: magnitude,
		})
		.then((res) => {
			console.log(res)
		})
}

function drawCircle(
	map: google.maps.Map,
	center: Coordinates | null,
	range: number
) {
	const circle = new google.maps.Circle({
		strokeColor: '#6e1710',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: '#f0aaa5',
		fillOpacity: 0.4,
		map,
		center: center,
		radius: range * 1000,
	})
}

function loadGoogleMaps(markers: Marker[], circles: Circle[], range: number) {
	map = new google.maps.Map(googlemap.current, mapOptions)

	const initMarker = new google.maps.Marker({
		position: {
			lat: 41.842785,
			lng: -87.749486,
		},
		map: map,
	})
	markers.push(initMarker)

	const initCircle = new google.maps.Circle({
		strokeColor: '#6e1710',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: '#f0aaa5',
		fillOpacity: 0.4,
		map,
		center: initMarker.position,
		radius: range * 1000,
	})
	circles.push(initCircle)

	map.addListener('click', (e) => {
		placeMarkerAndPanTo(e.latLng, map)
		drawCircle(e.latLng)
		sendCoordinates(e.latLng)
	})
}

function deleteLastMarker() {
	markers[0].setMap(null)
	markers = []
}

function deleteLastCircle() {
	circles[0].setMap(null)
	circles = []
}

function placeMarkerAndPanTo(latLng: google.maps.LatLng, map: google.maps.Map) {
	deleteLastMarker()
	deleteLastCircle()
	const newMarker = new google.maps.Marker({
		position: latLng,
		map: map,
	})
	markers.push(newMarker)
	map.panTo(latLng)
}

function sendCoordinates(latLng: google.maps.LatLng) {
	axios
		.post('http://localhost:3005/map', {
			position: latLng,
		})
		.then((res) => {
			console.log(res)
		})
}

export { sendQueryDetails, drawCircle, loader }
