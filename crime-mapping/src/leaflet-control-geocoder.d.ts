// src/leaflet-control-geocoder.d.ts
declare module 'leaflet-control-geocoder' {
    import * as L from 'leaflet';

    export interface Geocoder {
        geocode(
            query: string,
            cb: (results: { center: L.LatLng; name: string }[]) => void,
            context?: any
        ): void;
    }

    export namespace Control {
        function Geocoder(options?: any): any;
    }

    export namespace Util {
        function getJSON(url: string, params: any, callback: any): any;
    }

    export namespace Geocoder {
        function Nominatim(options?: any): Geocoder;
    }
}
