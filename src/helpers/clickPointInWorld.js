
import * as THREE from 'three';

const clickPointInWorld = (event, camera, targetZ)=>{
    // compute click position in 3d world through the projection of my camera
    let vec = new THREE.Vector3();
    let pos = new THREE.Vector3();
    vec.set(
      ( event.clientX / window.innerWidth ) * 2 - 1,
      - ( event.clientY / window.innerHeight ) * 2 + 1,
      0.5 );
    vec.unproject( camera );
    vec.sub( camera.position ).normalize();
    let distance = (targetZ - camera.position.z) / vec.z;
    pos.copy( camera.position ).add( vec.multiplyScalar( distance ) );
    return pos;
};

export default clickPointInWorld;