import type {NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { Loader } from '@googlemaps/js-api-loader';
import {useRef, useEffect, useState } from 'react';
import axios from 'axios';
import {sendQueryDetails} from './map.utils'
import router, { useRouter } from 'next/router';



const Map: NextPage = () => {
    
    const [range, setRange] = useState(100);
    const [magnitude, setMagnitude] = useState(3)
    const [parameters, setParameters] = useState({range: range, magnitude: magnitude})
    const [latLng, setLatLng] = useState({lat: 41, lng:-87})
    const googlemap = useRef(null);

    useEffect(() => {
        // const request = axios.CancelToken.source()
        let map: google.maps.Map;

        const loader = new Loader({
            apiKey: "AIzaSyCpIlR_C6dJUTOmhPH15sV3vDfoGP09Ztg",
            version: "weekly",
        });
        
        let markers:any = [];
        let circles:any = [];
        const mapOptions = {
            center: {
              lat: 41,
              lng: -87
            },
            zoom: 4
          };
    
          loader.load().then(() => {
            map = new google.maps.Map(googlemap.current, mapOptions);

            const initMarker = new google.maps.Marker({
                position: {
                    lat: 41.842785,
                    lng: -87.749486
                },
                map: map
            })
            markers.push(initMarker)

            const initCircle = new google.maps.Circle({
                strokeColor: '#6e1710',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#f0aaa5",
                fillOpacity: 0.4,
                map,
                center: initMarker.position,
                radius: range * 1000
            })
            circles.push(initCircle)

            map.addListener('click', (e) => {
                placeMarkerAndPanTo(e.latLng, map)
                drawCircle(e.latLng)
                sendCoordinates(e.latLng)
            })

            function drawCircle(center) {
                const circle = new google.maps.Circle({
                    strokeColor: '#6e1710',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#f0aaa5",
                    fillOpacity: 0.4,
                    map,
                    center: center,
                    radius: range * 1000
                })
                circles.push(circle)
            }
            function deleteLastMarker() {
                markers[0].setMap(null);
                markers = [];
            }

            function deleteLastCircle() {
                circles[0].setMap(null);
                circles = [];
            }

            function placeMarkerAndPanTo(latLng: google.maps.LatLng, map: google.maps.Map) {
                deleteLastMarker();
                deleteLastCircle();
                const newMarker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                });
                markers.push(newMarker);
                map.panTo(latLng);
            }

            function sendCoordinates(latLng:google.maps.LatLng) {
                axios.post('http://localhost:3005/map',  {
                    position: latLng
                })
                .then((res) => {
                    console.log(res)
                })
            }
            
        });

    }, [parameters]);

    function getEarthquakes() {
        axios.get('http://localhost:3005/earthquakes')
        .then((res) => {
            console.log(res)
        })
    }

    return (
        <div className="flex flex-col items-center bg-">
            <h1 className="items-center text-xl font-bold justify-center p-4">Earthquake Locator</h1>
            <div className="h-96 w-full rounded-2xl border-4 border-solid border-black" ref={googlemap}></div>

            <div className="flex flex-col bg-pink-300 text-black w-3/4 p-1 my-5 text-xl font-semibold">
                <h1 className=""> Choose range(in km) of earthquake</h1>
                <input type="number" className="text-black" onChange={(e) => {
                        setRange(Number(e.target.value))}
                    } />

                <h1 className=""> Choose minimum magnitude of earthquake</h1>
                <input type="number" className="text-black" onChange={(e) => {
                    setMagnitude(Number(e.target.value))}
                    }/>
            </div>
            <button className="w-auto place-content-center my-5 px-10 py-3 bg-green-900 uppercase text-white font-semibold shadow-md rounded-md transiiton duration-200 ease-in-out hover:bg-green-600"
                onClick={() => {
                    setParameters({range, magnitude});
                }}
            >Set Parameters</button>
            <button className="w-auto place-content-center my-5 px-10 py-3 bg-green-900 uppercase text-white font-semibold shadow-md rounded-md transiiton duration-200 ease-in-out hover:bg-green-600"
                onClick={() => {
                    sendQueryDetails(range, magnitude);
                    getEarthquakes()
                    setLatLng(latLng);
                    router.push('/results')
                }}> 
                Search 
            </button>

            {

            }
        </div>
        
        
    )
}

export default Map