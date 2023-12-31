/* eslint-disable react/no-unknown-property */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 planet.gltf --transform 
Files: planet.gltf [2.01MB] > planet-transformed.glb [548.24KB] (73%)
Author: cmzw (https://sketchfab.com/cmzw)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/stylized-planet-789725db86f547fc9163b00f302c3e70
Title: Stylized planet
*/

import { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export function Planet(props) {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF('/planet-transformed.glb');
    // eslint-disable-next-line no-unused-vars
    const { actions } = useAnimations(animations, group);

    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Sketchfab_Scene">
                <group name="GLTF_SceneRootNode" rotation={[0.031, 0, 0.064]}>
                    <group name="Clouds_1">
                        <mesh
                            name="Object_4"
                            geometry={nodes.Object_4.geometry}
                            material={materials.Clouds}
                            scale={3.5}
                        />
                    </group>
                    <group name="Planet_2">
                        <mesh
                            name="Object_6"
                            geometry={nodes.Object_6.geometry}
                            material={materials.Planet}
                            scale={3.5}
                        />
                    </group>
                </group>
            </group>
        </group>
    );
}

useGLTF.preload('/planet-transformed.glb');

/* 
<group ref={group} {...props} dispose={null}>
            <group name="Sketchfab_Scene">
                <group name="GLTF_SceneRootNode" rotation={[0.031, 0, 0.064]}>
                    <group name="Clouds_1">
                        <mesh
                            name="Object_4"
                            geometry={nodes.Object_4.geometry}
                            material={materials.Clouds}
                        />
                    </group>
                    <group name="Planet_2">
                        <mesh
                            name="Object_6"
                            geometry={nodes.Object_6.geometry}
                            material={materials.Planet}
                        />
                    </group>
                </group>
            </group>
        </group>
*/
