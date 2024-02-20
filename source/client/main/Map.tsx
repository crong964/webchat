import tt from "@tomtom-international/web-sdk-maps";
import * as ser from "@tomtom-international/web-sdk-services";
import React, { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { postData } from "../Use/useFetch";

interface LngLat {
  lng: number;
  lat: number;
  hash?: any;
}
interface ClientSocket {
  clientSocket: Socket | null;
  statusShare: boolean;
  lng: string;
  lat: string;
}
function useMap(clientSocket: ClientSocket) {
  const [map, SetMap] = useState<tt.Map | undefined>(undefined);
  const [control, SetControl] = useState<tt.GeolocateControl | undefined>(
    undefined
  );
  var [marker, SetMarker] = useState<tt.Marker>();
  var [markList, SetMarkList] = useState<tt.Marker[]>([]);
  var [load, SetLoad] = useState(false);

  useEffect(() => {
    var control2 = new tt.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
        timeout: 2000,
      },
      showUserLocation: true,
      trackUserLocation: true,
    });

    var map2 = tt.map({
      container: "boxchat",
      key: "NcCz24AQhyNMZ4h7LAudoLDGBatHcRnb",
      center: [-122.4194, 37.7749],
      zoom: 12,
    });

    control2.on("geolocate", (e) => {
      console.log(e);
    });

    map2.addControl(control2);
    SetMap(map2);
    SetControl(control2);
  }, []);

  useEffect(() => {
    if (map) {
      map.on("click", (e) => {
        var marker = new tt.Marker().setLngLat(e.lngLat).addTo(map);
        var location: LngLat = {
          lat: e.lngLat.lat,
          lng: e.lngLat.lng,
        };
        clientSocket.clientSocket?.emit("shareLocation", location);
        SetMarkList([...markList, marker]);
      });

      if (clientSocket.lat != "N") {
        var marker = new tt.Marker()
          .setLngLat({
            lat: parseFloat(clientSocket.lat),
            lng: parseFloat(clientSocket.lng),
          })
          .addTo(map);
        map.setCenter(marker.getLngLat());
        map.setZoom(12);
        SetMarker(marker);
      }
      SetMap(map);
      return () => {
        if (map) {
          map.off("click", (e) => {
            var marker = new tt.Marker().setLngLat(e.lngLat).addTo(map);
            SetMarkList([...markList, marker]);
          });
        }
      };
    }
  }, [map, markList]);

  useEffect(() => {
    var marker = new tt.Marker();
    clientSocket.clientSocket?.on("receiveYourLocation", (data: LngLat) => {
      if (map) {
        var ll = new tt.LngLat(data.lng, data.lat);
        marker.setLngLat(ll).addTo(map);
      }
    });
    return () => {
      clientSocket.clientSocket?.off("receiveYourLocation");
    };
  }, [clientSocket, map]);

  function Cal() {
    var lo = markList.map((v) => {
      return v.getLngLat();
    });
    ser.services
      .calculateRoute({
        key: "NcCz24AQhyNMZ4h7LAudoLDGBatHcRnb",
        locations: lo,
        travelMode: "truck",
      })
      .then((v) => {
        map?.addLayer({
          id: "green",
          type: "line",
          source: {
            data: v.toGeoJson(),
            type: "geojson",
          },
          paint: {
            "line-color": "green",
            "line-width": 6,
          },
        });
      })
      .catch((v) => {
        console.log("lỗi ");

        console.log(v);
      });
  }
  function LoaD() {
    SetLoad(!load);
  }
  function Xoa() {
    markList = [];
    SetMarkList([
      ...markList.filter((v) => {
        return false;
      }),
    ]);
  }
  return { marker, SetMarker, map, markList, SetMarkList, Cal, LoaD, Xoa };
}
export default function Map(clientSocket: ClientSocket) {
  var { map, markList, SetMarkList, Cal, LoaD, Xoa, marker, SetMarker } =
    useMap(clientSocket);

  return (
    
    <div id="boxchat" className="relative w-full h-[700px] ">
    
      <div className="absolute z-50 top-0 left-0">
        {clientSocket.statusShare ? (
          <button
            className="bg-red-500 text-white inline-block"
            onClick={() => {
              postData("map/stopShareLoction", {}, () => {});
            }}
          >
            đang chia sẻ vị trí
          </button>
        ) : (
          <></>
        )}
        {marker != undefined ? (
          <div
            className="bg-blue-600 text-white font-mono font-bold rounded-xl px-1 py-0.5"
            onClick={() => {
              marker?.remove();
              SetMarker(marker);
            }}
          >
            Xóa đánh dấu
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
