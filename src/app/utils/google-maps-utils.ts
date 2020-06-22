export namespace GoogleMapsUtils {
    const googleMapsKey = "AIzaSyDMW8LLqC8O5tV8s5aZ97EDFa7RtHKshy4";
    let loadScriptPromise: Promise<void> = null;
    let scripts: HTMLScriptElement;

    export function loadScript(): Promise<void> {
        if (!loadScriptPromise) {
            loadScriptPromise = new Promise<void>(resolve => {
                const callbackName = "googleMapsCallback" + Date.now();
                window[callbackName] = () => {
                    resolve();
                    delete window[callbackName];
                };

                scripts = document.createElement("script");
                scripts.async = true;
                scripts.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}&callback=${callbackName}`;

                document.head.appendChild(scripts);
            });
        }

        return loadScriptPromise;
    }

    export function unloadScript(): void {
        if (scripts) {
            document.head.removeChild(scripts);
            scripts = null;
            loadScriptPromise = null;
        }
    }

    export function getDefaultStyles(): google.maps.MapTypeStyle[] {
        return [{
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
                { color: "#e9e9e9" },
                { lightness: 17 }]
        },
        {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [
                { color: "#f5f5f5" },
                { lightness: 20 }
            ]
        },
        {
            featureType: 'road.highway',
            stylers: [
                { color: "#ffffff" },
                { lightness: 17 }
            ]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
                { color: "#ffffff" },
                { lightness: 29 },
                { weight: 0.2 }
            ]
        },
        {
            featureType: "road.arterial",
            elementType: 'geometry',
            stylers: [
                { color: "#ffffff" },
                { lightness: 18 }
            ]
        },
        {
            featureType: "road.local",
            elementType: 'geometry',
            stylers: [
                { color: "#ffffff" },
                { lightness: 16 }
            ]
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
                { color: "#f5f5f5" },
                { lightness: 21 }
            ]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [
                { color: "#dedede" },
                { lightness: 21 }
            ]
        },
        {
            elementType: 'labels.text.stroke',
            stylers: [
                { visibility: "on" },
                { color: "#ffffff" },
                { lightness: 16 }
            ]
        },
        {
            elementType: 'labels.text.fill',
            stylers: [
                { saturation: 36 },
                { color: "#333333" },
                { lightness: 40 }
            ]
        },
        {
            elementType: "labels.icon",
            stylers: [
                { visibility: "off" }
            ]
        },
        {
            featureType: "transit",
            elementType: 'geometry',
            stylers: [
                { color: "#f2f2f2" },
                { lightness: 19 }
            ]
        },
        {
            featureType: 'administrative',
            stylers: [
                { color: "#fefefe" },
                { lightness: 20 }
            ]
        },
        {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [
                { color: "#fefefe" },
                { lightness: 17 },
                { weight: 1.2 }
            ]
        }];
    } 
}