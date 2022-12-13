import {
  Engine,
  Scene,
  FreeCamera,
  HemisphericLight,
  Vector3,
  MeshBuilder,
} from "babylonjs";

const canvas = document.getElementById("canvas");

const engine = new Engine(canvas, true);

const createScene = async () => {
  const scene = new Scene(engine);
  const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
  camera.setTarget(Vector3.Zero());
  camera.attachControl(canvas, true);
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;
  const sphere = MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2, segments: 32 },
    scene
  );
  sphere.position.y = 1;

  const env = scene.createDefaultEnvironment();

  const xr = await scene.createDefaultXRExperienceAsync({
    floorMeshes: [env.ground],
    uiOptions: {
      sessionMode: "immersive-ar",
    },
  });

  return scene;
};

const runStuff = async () => {
  const scene = await createScene();

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener("resize", () => {
    engine.resize();
  });
};

runStuff();
