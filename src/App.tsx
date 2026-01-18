import { useEffect, useRef } from "react";
import Jassub from "jassub";

export function App() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function init() {
      if (!ref.current) return;
      console.log("init");
      const jassub = new Jassub({
        video: ref.current,
        workerUrl: "/jassub/jassub-worker.js",
        wasmUrl: "/jassub/jassub-worker.wasm",
        modernWasmUrl: "/jassub/jassub-worker-modern.wasm",
        subUrl: "https://github.com/ThaUnknown/jassub/raw/refs/heads/gh-pages/static/subtitles/FGOBD.ass",
        availableFonts: {
            "liberation sans": "/jassub/default.woff2",
        },
        fallbackFont: "liberation sans",
      });
      console.log("waiting");
      await jassub.ready;
      console.log("ready");
    }
    init();
  }, []);

  return (
    <div className="app">
      <h1>Jassub</h1>
      <video ref={ref} src="https://v.animethemes.moe/FateGrandOrderBabylonia-OP1v2-NCBD1080.webm" id="video" style={{
        width: "100%",
        height: "100%"
      }} autoPlay controls />
    </div>
  );
}

export default App;
