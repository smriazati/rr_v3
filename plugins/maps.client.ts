export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    let isLoaded = false
    let waiting: any[] = []

    addScript()

    return {
        provide: {
            maps: {
                showMap
            }
        }
    }

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
                item.fn(...item.arguments)
            }
        })
        waiting = []
    }

    function showMap(canvas: HTMLElement, lat: string, lng: string, markers: any[], storymapName: string) {
        if (!isLoaded) {
            waiting.push({
                fn: showMap,
                arguments: [canvas, lat, lng, markers, storymapName],
            })
            return
        }

        const mapOptions = {
            zoom: 8,
            center: new (window as any).google.maps.LatLng(parseFloat(lat), parseFloat(lng)),
            disableDefaultUI: true,
            zoomControl: true,
            mapTypeId: 'hybrid',
            styles: [{
                featureType: 'poi',
                elementType: 'labels.icon',
                stylers: [{ visibility: 'off' }]
            },
            {
                featureType: 'road',
                elementType: 'labels.icon',
                stylers: [{ visibility: 'off' }]
            },
            {
                featureType: 'transit',
                elementType: 'labels.icon',
                stylers: [{ visibility: 'off' }]
            },
            ]
        }

        const map = new (window as any).google.maps.Map(canvas, mapOptions)

        function showMarkers() {
            function mapMarkerIcon(color: string) {
                const mapMarkerIcon = {
                    path: "M257.6,546.7C315.7,477.5,439,320.1,439,231c0-116.5-94.5-211-211-211S17,114.5,17,231c0,89.1,123.3,246.5,181.4,315.7L228,740L257.6,546.7z",
                    fillColor: color,
                    fillOpacity: 1,
                    strokeWeight: 2,
                    strokeColor: "#000",
                    scale: 0.1,
                    anchor: new (window as any).google.maps.Point(15, 30),
                };
                return mapMarkerIcon;
            }

            const bounds = new (window as any).google.maps.LatLngBounds()
            const colors = [
                '#54a131',
                '#70a131',
                '#8ca131',
                '#a19a31',
                '#a17e31',
                '#a16231'
            ]
            const markerSeenColor = "#131313";

            markers.forEach((m: any, i: number) => {
                const position = new (window as any).google.maps.LatLng(parseFloat(m.lat), parseFloat(m.lng))
                const marker = new (window as any).google.maps.Marker({
                    position,
                    icon: mapMarkerIcon(colors[i]),
                    clickable: true,
                })

                marker.setCursor('pointer')

                let markerSeen = false;

                marker.addListener("mouseover", () => {
                    if (!markerSeen) {
                        marker.setIcon(mapMarkerIcon("#fff"))
                    }
                });

                marker.addListener("mouseout", () => {
                    if (!markerSeen) {
                        marker.setIcon(mapMarkerIcon(colors[i]))
                    }
                });

                marker.addListener("click", () => {
                    marker.setIcon(mapMarkerIcon(markerSeenColor))
                    markerSeen = true;
                    // Note: You'll need to update this to use Pinia or the new store pattern
                    // context.store.commit(`occupation/setActiveStory`, m.id);
                });

                // add listeners to map controls navigation
                const mapControlListItem = document.getElementById(`marker-${m.id}`);
                if (mapControlListItem) {
                    // click event
                    (window as any).google.maps.event.addDomListener(mapControlListItem, "click", () => {
                        markerSeen = true;
                        marker.setIcon(mapMarkerIcon(markerSeenColor))
                    });

                    // hover event 
                    (window as any).google.maps.event.addDomListener(mapControlListItem, "mouseover", () => {
                        if (!markerSeen) {
                            marker.setIcon(mapMarkerIcon("#fff"))
                        }
                    });

                    (window as any).google.maps.event.addDomListener(mapControlListItem, "mouseout", () => {
                        if (!markerSeen) {
                            marker.setIcon(mapMarkerIcon(colors[i]))
                        }
                    });
                }

                marker.setMap(map)
                bounds.extend(position)
            })

            const centerButton = document.getElementById("recenterMap");
            if (centerButton) {
                (window as any).google.maps.event.addDomListener(centerButton, "click", () => {
                    console.log('clicking center button')
                    map.fitBounds(bounds, 150)
                });
            }

            map.fitBounds(bounds, 150)
        }

        const panToButton = document.getElementById("panToButton");

        if (panToButton) {
            const zoomOutNCDuration = 3000;
            const panToUkraineDelay = zoomOutNCDuration;
            const panToUkraineDuration = 1500;
            const zoomInTuchynDelay = panToUkraineDelay + panToUkraineDuration;
            const zoomInTuchynDuration = 1500;
            const animationDelay = 2500;
            const animationDuration = zoomInTuchynDelay + zoomInTuchynDuration + animationDelay;

            function animateMapZoomOut(map: any, targetZoom: number) {
                var currentZoom = arguments[2] || map.getZoom();
                if (currentZoom != targetZoom) {
                    (window as any).google.maps.event.addListenerOnce(map, 'zoom_changed', function (event: any) {
                        animateMapZoomOut(map, targetZoom, currentZoom - (targetZoom < currentZoom ? 1 : -1));
                    });
                    setTimeout(function () { map.setZoom(currentZoom) }, 100);
                }
            }

            function zoomOutNC() {
                animateMapZoomOut(map, 3)
            }

            function panToUkraine() {
                const tuchyn = new (window as any).google.maps.LatLng(50.711008, 26.573502)
                map.panTo(tuchyn)
            }

            function animateMapZoomIn(map: any, targetZoom: number) {
                var currentZoom = arguments[2] || map.getZoom();
                if (currentZoom != targetZoom) {
                    (window as any).google.maps.event.addListenerOnce(map, 'zoom_changed', function (event: any) {
                        animateMapZoomIn(map, targetZoom, currentZoom - (targetZoom < currentZoom ? 1 : -1));
                    });
                    setTimeout(function () { map.setZoom(currentZoom) }, 100);
                }
            }

            function zoomInTuchyn() {
                animateMapZoomIn(map, 8)
            }

            function animationComplete() {
                showMarkers()
            }

            function panningAnimation() {
                setTimeout(zoomOutNC, 0)
                setTimeout(panToUkraine, panToUkraineDelay)
                setTimeout(zoomInTuchyn, zoomInTuchynDelay)
                setTimeout(animationComplete, animationDuration)
            }

            function onReturnVisit() {
                showMarkers()
            }

            if (storymapName === 'tuchyn') {
                panningAnimation()
            } else {
                onReturnVisit()
            }
        } else {
            showMarkers()
        }
    }
}) 