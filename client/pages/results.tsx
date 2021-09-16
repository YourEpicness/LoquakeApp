import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { Loader } from '@googlemaps/js-api-loader'
import axios from 'axios'
import { useState, useRef, useEffect } from 'react'
import router, { useRouter } from 'next/router'

const Results: NextPage = () => {
	const positions: any = []
	const googlemap = useRef(null)

	async function getResultCoordinates() {
		await axios.get('http://localhost:3005/results').then((results) => {
			const { data } = results
			data.forEach((info: any) => {
				const { lat, lng, ...rest } = info
				positions.push({
					position: {
						lng,
						lat,
					},
					...rest,
				})
			})
		})
	}

	const API_KEY: any = process.env.NEXT_PUBLIC_GMAPS_API
	useEffect(() => {
		let resultsMap: google.maps.Map
		let infowindow: any

		const loader = new Loader({
			apiKey: API_KEY,
			version: 'weekly',
		})

		let marker: any, i

		const mapOptions = {
			center: {
				lat: 39.7,
				lng: -98.1,
			},
			zoom: 4,
		}

		loader.load().then(async () => {
			resultsMap = new google.maps.Map(googlemap.current!, mapOptions)
			infowindow = new google.maps.InfoWindow()

			await getResultCoordinates()
			for (i = 0; i < positions.length; i++) {
				marker = new google.maps.Marker({
					position: {
						lat: positions[i].position.lng,
						lng: positions[i].position.lat,
					},
					map: resultsMap,
				})

				google.maps.event.addListener(
					marker,
					'click',
					(function (marker, i) {
						return function () {
							const { mag, place, time } = positions[i]
							const date = new Date(time)
							infowindow.setContent(
								`<p> Time: ${date.toString()}<br />Magnitude: ${mag}<br />Location: ${place}</p>`
							)
							infowindow.open(resultsMap, marker)
						}
					})(marker, i)
				)

				// Attempt to close marker on double click
				google.maps.event.addListener(
					marker,
					'dblclick',
					(function (marker, i) {
						return function () {
							infowindow.close(resultsMap, marker[i])
						}
					})(marker, i)
				)
			}
		})
	}, [])

	return (
		<div>
			<h1 className='text-bold text-xl'> Results </h1>
			<div
				className='h-96 w-full rounded-2xl border-4 border-solid border-black'
				ref={googlemap}></div>

			<button
				className='w-auto place-content-center my-5 px-10 py-3 bg-green-900 uppercase text-white font-semibold shadow-md rounded-md transiiton duration-200 ease-in-out hover:bg-green-600'
				onClick={() => {
					router.push('/map')
				}}>
				Make Another Query
			</button>
		</div>
	)
}

export default Results
