import { Canvas } from "@react-three/fiber";
import Blob from "@/cmpnts/Blob";

export default function Home() {
  return (
    <>
      <div className="container">
        <Canvas camera={{position:[0.0, 0.0, 8.0]}}>
          <Blob/>
        </Canvas>
        <h1>It runs on <em>npm run dev</em></h1>
      </div>
    </>
  );
}
