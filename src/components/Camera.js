import React, {useRef, useEffect} from 'react'
// import {PerspectiveCamera, OrbitControls} from 'drei'
import {PerspectiveCamera} from 'drei'
import {TweenMax, Power2} from 'gsap';

export default function DefaultCamera({position}) {

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      let cameraPos = {
        x: ref.current.position.x,
        y: ref.current.position.y,
        z: ref.current.position.z,
      };
      TweenMax.from(cameraPos,2, {
        x: 0,
        y: 0,
        z: 0,
        ease: Power2.easeOut,
        onUpdate: () => {
          ref.current.position.x = cameraPos.x;
          ref.current.position.y = cameraPos.y;
          ref.current.position.z = cameraPos.z;
        }
      });
    }
  }, []);

  return (
    <>
    {/*<OrbitControls/>*/}
    <PerspectiveCamera
      ref={ref}
      makeDefault
      position={position}
      rotation={[0, 0, 0]}
      far={50}
    />
    </>
  )
}

