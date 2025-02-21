import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <>
      <div className="container">It runs on <em>npm run dev</em>
        <Canvas camera={{position:[0.0, 0.0, 8.0]}}>

        </Canvas>
      </div>
    </>
  );
}
