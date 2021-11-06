import React, {useEffect} from 'react'
import {PerspectiveCamera} from 'drei'
import {TweenMax, Power2} from 'gsap';

const camera = React.forwardRef((props, ref) => {

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
  }, [ref]);

  return (
    <>
      {/*<OrbitControls/>*/}
      <PerspectiveCamera
        ref={ref}
        makeDefault
        position={props.position}
        rotation={[0, 0, 0]}
        far={50}
      />
    </>
  )
});

export default camera;