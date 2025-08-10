export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    let isLoaded = false
    let waiting: { fn: Function; arguments: IArguments }[] = []
    const occupationStore = useOccupationStore()

    addScript()

    function addScript() {
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${config.public.mapsApi}&libraries=places&callback=initGoogleMaps`
        script.async = true
            ; (window as any).initGoogleMaps = initGoogleMaps
        document.head.appendChild(script)
    }

    function initGoogleMaps() {
        isLoaded = true
        waiting.forEach((item) => {
            if (typeof item.fn === 'function') {
                item.fn(...(item.arguments as any))
            }
        })
        waiting = []
    }

    function showMap(
        canvas: HTMLElement | null,
        lat: string,
        lng: string,
        markers: any[],
        storymapName: string
    ) {
        if (!isLoaded) {
            waiting.push({
                fn: showMap,
                arguments,
            })
            return
        }

        const mapOptions = {
            zoom: 8,
            center: new google.maps.LatLng(parseFloat(lat), parseFloat(lng)),
            disableDefaultUI: true,
            zoomControl: true,
            mapTypeId: 'hybrid',
            styles: [
                { featureType: 'poi', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
                { featureType: 'road', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
                { featureType: 'transit', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
            ],
        }
        const map = new google.maps.Map(canvas as HTMLElement, mapOptions)

        function showMarkers() {
            function mapMarkerIcon(color: string) {
                return {
                    path: 'M257.6,546.7C315.7,477.5,439,320.1,439,231c0-116.5-94.5-211-211-211S17,114.5,17,231c0,89.1,123.3,246.5,181.4,315.7L228,740L257.6,546.7z',
                    fillColor: color,
                    fillOpacity: 1,
                    strokeWeight: 2,
                    strokeColor: '#000',
                    scale: 0.1,
                    anchor: new google.maps.Point(15, 30),
                }
            }

            const bounds = new google.maps.LatLngBounds()
            const colors = ['#54a131', '#70a131', '#8ca131', '#a19a31', '#a17e31', '#a16231']
            const markerSeenColor = '#131313'

            markers.forEach((m, i) => {
                const position = new google.maps.LatLng(parseFloat(m.lat), parseFloat(m.lng))
                const marker = new google.maps.Marker({
                    position,
                    icon: mapMarkerIcon(colors[i]),
                    clickable: true,
                })

                marker.setCursor('pointer')
                let markerSeen = false

                marker.addListener('mouseover', () => {
                    if (!markerSeen) marker.setIcon(mapMarkerIcon('#fff'))
                })
                marker.addListener('mouseout', () => {
                    if (!markerSeen) marker.setIcon(mapMarkerIcon(colors[i]))
                })
                marker.addListener('click', () => {
                    marker.setIcon(mapMarkerIcon(markerSeenColor))
                    markerSeen = true
                    occupationStore.setActiveStory(m.id)
                })

                // DOM listeners for external controls
                const mapControlListItem = document.getElementById(`marker-${m.id}`)
                if (mapControlListItem) {
                    google.maps.event.addDomListener(mapControlListItem, 'click', () => {
                        markerSeen = true
                        marker.setIcon(mapMarkerIcon(markerSeenColor))
                    })
                    google.maps.event.addDomListener(mapControlListItem, 'mouseover', () => {
                        if (!markerSeen) marker.setIcon(mapMarkerIcon('#fff'))
                    })
                    google.maps.event.addDomListener(mapControlListItem, 'mouseout', () => {
                        if (!markerSeen) marker.setIcon(mapMarkerIcon(colors[i]))
                    })
                }

                marker.setMap(map)
                bounds.extend(position)
            })

            const centerButton = document.getElementById('recenterMap')
            if (centerButton) {
                google.maps.event.addDomListener(centerButton, 'click', () => {
                    map.fitBounds(bounds, 150)
                })
            }

            map.fitBounds(bounds, 150)
        }

        const panToButton = document.getElementById('panToButton')
        if (panToButton) {
            const zoomOutNCDuration = 3000
            const panToUkraineDelay = zoomOutNCDuration
            const panToUkraineDuration = 1500
            const zoomInTuchynDelay = panToUkraineDelay + panToUkraineDuration
            const zoomInTuchynDuration = 1500
            const animationDelay = 2500
            const animationDuration = zoomInTuchynDelay + zoomInTuchynDuration + animationDelay

            function animateMapZoomOut(map: any, targetZoom: number, currentZoom = map.getZoom()) {
                if (currentZoom !== targetZoom) {
                    google.maps.event.addListenerOnce(map, 'zoom_changed', () =>
                        animateMapZoomOut(map, targetZoom, currentZoom - (targetZoom < currentZoom ? 1 : -1))
                    )
                    setTimeout(() => map.setZoom(currentZoom), 100)
                }
            }
            function animateMapZoomIn(map: any, targetZoom: number, currentZoom = map.getZoom()) {
                if (currentZoom !== targetZoom) {
                    google.maps.event.addListenerOnce(map, 'zoom_changed', () =>
                        animateMapZoomIn(map, targetZoom, currentZoom + (targetZoom > currentZoom ? 1 : -1))
                    )
                    setTimeout(() => map.setZoom(currentZoom), 300)
                }
            }

            function zoomOutNC() {
                animateMapZoomOut(map, 3)
            }
            function panToUkraine() {
                const tuchynLatLng = new google.maps.LatLng(50.70456877384163, 26.564873)
                setTimeout(() => map.panTo(tuchynLatLng), panToUkraineDelay)
            }
            function zoomInTuchyn() {
                setTimeout(() => animateMapZoomIn(map, 16), zoomInTuchynDelay)
            }
            function animationComplete() {
                setTimeout(() => {
                    showMarkers()
                    occupationStore.setPanAnimComplete()
                }, animationDuration)
            }

            function panningAnimation() {
                occupationStore.resetPanAnimComplete()
                zoomOutNC()
                panToUkraine()
                zoomInTuchyn()
                animationComplete()
            }

            google.maps.event.addDomListener(panToButton, 'click', panningAnimation)

            const onReturnButton = document.getElementById('onReturnButton')
            google.maps.event.addDomListener(onReturnButton, 'click', () => {
                showMarkers()
            })
        }
    }

    return {
        provide: {
            maps: {
                showMap,
            },
        },
    }
})
