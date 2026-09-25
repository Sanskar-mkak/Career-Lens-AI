import * as THREE from 'three';

export const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
export const lerp = (a, b, t) => a + (b - a) * t;
export const damp = (current, target, lambda, dt) => lerp(current, target, 1 - Math.exp(-lambda * dt));
export const smoothstep = (t) => t * t * (3 - 2 * t);

export function roundedRectShape(width, height, radius) {
  const w = width / 2;
  const h = height / 2;
  const r = Math.min(radius, w, h);
  const shape = new THREE.Shape();
  shape.moveTo(-w + r, -h);
  shape.lineTo(w - r, -h);
  shape.quadraticCurveTo(w, -h, w, -h + r);
  shape.lineTo(w, h - r);
  shape.quadraticCurveTo(w, h, w - r, h);
  shape.lineTo(-w + r, h);
  shape.quadraticCurveTo(-w, h, -w, h - r);
  shape.lineTo(-w, -h + r);
  shape.quadraticCurveTo(-w, -h, -w + r, -h);
  return shape;
}

export function roundedPanelGeometry(width, height, depth, radius = 0.2, options = {}) {
  const bevel = options.bevel ?? Math.min(depth * 0.35, 0.08);
  const geometry = new THREE.ExtrudeGeometry(roundedRectShape(width, height, radius), {
    depth,
    bevelEnabled: bevel > 0,
    bevelSegments: options.bevelSegments ?? 4,
    steps: options.steps ?? 2,
    curveSegments: options.curveSegments ?? 12,
    bevelSize: bevel,
    bevelThickness: bevel,
  });
  geometry.translate(0, 0, -depth / 2);
  geometry.computeVertexNormals();
  return geometry;
}

export function curvedRoundedPanelGeometry(width, height, depth, radius = 0.2, bulge = 0.08, options = {}) {
  const geometry = roundedPanelGeometry(width, height, depth, radius, options);
  const position = geometry.attributes.position;
  const halfWidth = width * 0.5;
  const halfHeight = height * 0.5;
  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const y = position.getY(i);
    const normalizedX = clamp((x / halfWidth) * 1.04, -1, 1);
    const normalizedY = clamp((y / halfHeight) * 1.04, -1, 1);
    const edge = Math.max(0, 1 - normalizedX * normalizedX) * Math.max(0, 1 - normalizedY * normalizedY);
    position.setZ(i, position.getZ(i) + bulge * edge);
  }
  position.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

export function superellipsoidGeometry(radiusX, radiusY, radiusZ, segments = 56, rings = 32, power = 0.72, verticalPower = power) {
  const geometry = new THREE.SphereGeometry(1, segments, rings);
  const position = geometry.attributes.position;
  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const y = position.getY(i);
    const z = position.getZ(i);
    const shapedX = Math.sign(x) * Math.pow(Math.abs(x), power);
    const shapedY = Math.sign(y) * Math.pow(Math.abs(y), verticalPower);
    const shapedZ = Math.sign(z) * Math.pow(Math.abs(z), power);
    position.setXYZ(i, shapedX * radiusX, shapedY * radiusY, shapedZ * radiusZ);
  }
  position.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

export function latheProfileGeometry(profile, segments = 48, scaleZ = 1) {
  const points = profile.map(([radius, y]) => new THREE.Vector2(Math.max(0.0001, radius), y));
  const geometry = new THREE.LatheGeometry(points, segments);
  geometry.scale(1, 1, scaleZ);
  geometry.computeVertexNormals();
  return geometry;
}

export function capsuleMesh(radius, length, material, radialSegments = 20) {
  const mesh = new THREE.Mesh(new THREE.CapsuleGeometry(radius, length, 8, radialSegments), material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function makeTube(points, radius, material, tubularSegments = 24, radialSegments = 8) {
  const curve = new THREE.CatmullRomCurve3(points);
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, tubularSegments, radius, radialSegments, false), material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function makeCircleLine(radius, material, segments = 64, start = 0, length = Math.PI * 2) {
  const points = [];
  for (let i = 0; i <= segments; i += 1) {
    const angle = start + (i / segments) * length;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return new THREE.Line(geometry, material);
}

export function disposeObject(root) {
  root.traverse((object) => {
    if (object.geometry) object.geometry.dispose();
    if (object.material) {
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach((material) => material.dispose());
    }
  });
}
