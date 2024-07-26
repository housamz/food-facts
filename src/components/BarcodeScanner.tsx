import { useState, useEffect, useCallback } from "react";
// @ts-ignore
import Quagga from "quagga";
import { IBarcodeScannerResult } from "../models/barcode-scanner-result.interface";

interface Props {
  setStartScan: (value: boolean) => void;
  handleSearch: (value: string) => void;
}

const BarcodeScanner: React.FC<Props> = ({
  setStartScan,
  handleSearch,
}) => {
  const [cameraError, setCameraError] = useState(false);

  const onInitSuccess = () => {
    Quagga.start();
  };

  const onDetected = useCallback(
    (result: IBarcodeScannerResult) => {
      Quagga.offDetected(onDetected);
      handleSearch(result.codeResult.code);
      setStartScan(false);
    },
    [handleSearch, setStartScan]
  );

  useEffect(() => {
    const initQuagga = () => {
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector("#scanner-window"),
          },
          numOfWorkers: 1,
          locate: true,
          decoder: {
            readers: [
              "ean_reader",
              "ean_8_reader",
              "upc_reader",
              "code_128_reader",
            ],
          },
        },
        (err: string) => {
          if (err) {
            setCameraError(true);
            console.error("Quagga initialization failed:", err);
            return;
          }
          onInitSuccess();
        }
      );
      Quagga.onDetected(onDetected);
    };

    if (
      typeof navigator !== "undefined" &&
      typeof navigator.mediaDevices?.getUserMedia === "function"
    ) {
      initQuagga();
    }

    return () => {
      Quagga.offDetected(onDetected);
      Quagga.stop();
    };
  }, [onDetected]);

  return (
    <div className="mt-4">
      {cameraError ? <p>Camera error</p> : <div  id="scanner-window" />}
    </div>
  );
};

export default BarcodeScanner;
