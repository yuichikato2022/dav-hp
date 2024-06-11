import gsap from "gsap";
import { Vector2, MirroredRepeatWrapping } from "three";
import { Ob } from "../Ob";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

export default class extends Ob {
  setupTexes(uniforms) {
    this.texes.forEach((tex, key) => {
      const newTex = tex.clone();
      newTex.wrapT = MirroredRepeatWrapping;
      newTex.wrapS = MirroredRepeatWrapping;
      uniforms[key] = { value: newTex };
    });
    return uniforms;
  }
  setupUniforms() {
    const uniforms = super.setupUniforms();
    uniforms.uNoiseScale = { value: new Vector2(2, 2) };
    return uniforms;
  }
  setupVertex() {
    console.log(this.uniforms)
    return vertexShader;
  }
  setupFragment() {
    return fragmentShader;
  }
  debug(folder) {
    folder.add(this.uniforms.uNoiseScale.value, "x", 0, 10, 0.1);
    folder.add(this.uniforms.uNoiseScale.value, "y", 0, 10, 0.1);
    folder
      .add(this.uniforms.uProgress, "value", 0, 1, 0.1)
      .name("progess")
      .listen();
    const datData = { next: !!this.uniforms.uProgress.value };
    folder.add(datData, "next").onChange(() => {
      gsap.to(this.uniforms.uProgress, {
        value: +datData.next,
        duration: 1.5,
        ease: "power3.inOut",
      });
    });
  }
}
