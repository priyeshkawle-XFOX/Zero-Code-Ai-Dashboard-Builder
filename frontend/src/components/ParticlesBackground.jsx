import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },

        background: {
          color: "transparent",
        },

        particles: {
          number: {
            value: 60,
          },

          color: {
            value: "#6366f1",
          },

          links: {
            enable: true,
            color: "#6366f1",
            distance: 150,
            opacity: 0.4,
          },

          move: {
            enable: true,
            speed: 1.5,
          },

          size: {
            value: 3,
          },

          opacity: {
            value: 0.5,
          },
        },
      }}
    />
  );
}