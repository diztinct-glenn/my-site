"use client";
import { useEffect, useRef } from "react";

interface BlobCanvasProps {
  imageSrc: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  className?: string;
  /**
   * Horizontal offset for image crop center, as a percentage of crop width (-0.5 to 0.5). Negative = shift left, positive = shift right.
   */
  centerOffsetX?: number;
  /**
   * Vertical offset for image crop center, as a percentage of crop height (-0.5 to 0.5). Negative = shift up, positive = shift down.
   */
  centerOffsetY?: number;
  /**
   * Zoom factor for the image crop. 1 = normal, <1 = zoom out (image smaller), >1 = zoom in (image larger).
   */
  zoom?: number;
}

export default function BlobCanvas({ imageSrc, width, height, style, className, centerOffsetX = 0, centerOffsetY = 0, zoom = 1 }: BlobCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blobRef = useRef<any>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Blob and Point classes (adapted from provided JS)
  class Point {
    parent: any;
    azimuth: number;
    _components: { x: number; y: number };
    _acceleration = 0;
    _speed = 0;
    _radialEffect = 0;
    _elasticity = 0.001;
    _friction = 0.0085;
    constructor(azimuth: number, parent: any) {
      this.parent = parent;
      this.azimuth = Math.PI - azimuth;
      this._components = {
        x: Math.cos(this.azimuth),
        y: Math.sin(this.azimuth),
      };
      this.acceleration = -0.3 + Math.random() * 0.6;
    }
    solveWith(leftPoint: any, rightPoint: any) {
      this.acceleration =
        (-0.3 * this.radialEffect + (leftPoint.radialEffect - this.radialEffect) + (rightPoint.radialEffect - this.radialEffect)) *
          this.elasticity -
        this.speed * this.friction;
    }
    set acceleration(value: number) {
      this._acceleration = value;
      this.speed += this._acceleration * 2;
    }
    get acceleration() {
      return this._acceleration || 0;
    }
    set speed(value: number) {
      this._speed = value;
      this.radialEffect += this._speed * 5;
    }
    get speed() {
      return this._speed || 0;
    }
    set radialEffect(value: number) {
      this._radialEffect = value;
    }
    get radialEffect() {
      return this._radialEffect || 0;
    }
    get position() {
      const center = this.parent.center;
      const radius = this.parent._radius;
      const x = center.x + this.components.x * (radius + this.radialEffect);
      const y = center.y + this.components.y * (radius + this.radialEffect);
      return { x, y };
    }
    get components() {
      return this._components;
    }
    set elasticity(value: number) {
      this._elasticity = value;
    }
    get elasticity() {
      return this._elasticity;
    }
    set friction(value: number) {
      this._friction = value;
    }
    get friction() {
      return this._friction;
    }
  }

  class Blob {
    points: Point[] = [];
    _color: string | null = null;
    _canvas: HTMLCanvasElement | null = null;
    ctx: CanvasRenderingContext2D | null = null;
    _points = 32;
    cssWidth: number;
    cssHeight: number;
    _radius: number;
    _position = { x: 0.5, y: 0.5 };
    mousePos: { x: number; y: number } | null = null;
    image: HTMLImageElement | null = null;
    constructor(cssWidth: number, cssHeight: number) {
      this.cssWidth = cssWidth;
      this.cssHeight = cssHeight;
      this._radius = Math.min(cssWidth, cssHeight) / 2 - 10;
    }
    setRadius(r: number) {
      this._radius = r;
    }
    init() {
      this.points = [];
      for (let i = 0; i < this.numPoints; i++) {
        let point = new Point(this.divisional * (i + 1), this);
        this.push(point);
      }
    }
    render = () => {
      if (!this.canvas || !this.ctx) return;
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // Draw the animated blob path and use it as a clipping mask
      const pointsArray = this.points;
      const points = this.numPoints;
      pointsArray[0].solveWith(pointsArray[points - 1], pointsArray[1]);
      let p0 = pointsArray[points - 1].position;
      let p1 = pointsArray[0].position;
      let _p2 = p1;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
      for (let i = 1; i < points; i++) {
        pointsArray[i].solveWith(pointsArray[i - 1], pointsArray[i + 1] || pointsArray[0]);
        let p2 = pointsArray[i].position;
        var xc = (p1.x + p2.x) / 2;
        var yc = (p1.y + p2.y) / 2;
        ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
        p1 = p2;
      }
      var xc = (p1.x + _p2.x) / 2;
      var yc = (p1.y + _p2.y) / 2;
      ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
      ctx.closePath();
      ctx.clip();
      // Draw the image, center-cropped, inside the blob mask
      if (this.image && this.image.complete) {
        const img = this.image;
        const canvas = this.canvas;
        if (img && canvas) {
          const imgAspect = img.width / img.height;
          const canvasAspect = canvas.width / canvas.height;
          // Calculate crop area based on aspect ratio
          let cropW, cropH;
          if (imgAspect > canvasAspect) {
            // Image is wider than canvas: crop sides
            cropH = img.height;
            cropW = cropH * canvasAspect;
          } else {
            // Image is taller than canvas: crop top/bottom
            cropW = img.width;
            cropH = cropW / canvasAspect;
          }
          // Apply zoom to both dimensions
          cropW = cropW / zoom;
          cropH = cropH / zoom;
          // Center, then apply offsets
          const sx = (img.width - cropW) / 2 + centerOffsetX * cropW;
          const sy = (img.height - cropH) / 2 + centerOffsetY * cropH;
          ctx.drawImage(img, sx, sy, cropW, cropH, 0, 0, canvas.width, canvas.height);
        }
      }
      ctx.restore();

      requestAnimationFrame(this.render);
    };
    push(item: any) {
      if (item instanceof Point) {
        this.points.push(item);
      }
    }
    set color(value: string | null) {
      this._color = value;
    }
    get color() {
      return this._color || "#000000";
    }
    set canvas(value: HTMLCanvasElement | null) {
      if (value instanceof HTMLCanvasElement) {
        this._canvas = value;
        this.ctx = this._canvas.getContext("2d");
      }
    }
    get canvas() {
      return this._canvas;
    }
    set numPoints(value: number) {
      if (value > 2) {
        this._points = value;
      }
    }
    get numPoints() {
      return this._points || 32;
    }
    set position(value: { x: number; y: number }) {
      if (typeof value == "object" && value.x && value.y) {
        this._position = value;
      }
    }
    get position() {
      return this._position || { x: 0.5, y: 0.5 };
    }
    get divisional() {
      return (Math.PI * 2) / this.numPoints;
    }
    get center() {
      // Use CSS pixel values for center
      return { x: this.cssWidth * this.position.x, y: this.cssHeight * this.position.y };
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    function setCanvasSize(): { w: number, h: number } {
      let w: number = 150;
      let h: number = 150;
      if (typeof width === 'number' && !isNaN(width) && typeof height === 'number' && !isNaN(height)) {
        w = width;
        h = height;
      } else if (window.innerWidth >= 768) {
        // Use parent size for md+
        const parent = canvas?.parentElement;
        if (parent) {
          const rect = parent.getBoundingClientRect();
          w = rect.width > 0 ? rect.width : 340;
          h = rect.height > 0 ? rect.height : 340;
        } else {
          w = 340;
          h = 340;
        }
      }
      // Always use the minimum of w and h for a square canvas
      const size = Math.min(w, h);
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
      }
      return { w: size, h: size };
    }
    const { w, h } = setCanvasSize();
    const blob = new Blob(w, h);
    blob.canvas = canvas;
    blob.numPoints = 32;
    blob.position = { x: 0.5, y: 0.5 };
    blob.init();
    blobRef.current = blob;
    // Load image
    const img = new window.Image();
    img.src = imageSrc;
    img.onload = () => {
      console.log('Image loaded', img.width, img.height);
      blob.image = img;
      blob.render();
    };
    imgRef.current = img;
    // CodePen-style ripple: only affect nearest point on pointer move
    let oldMousePoint = { x: 0, y: 0 };
    let hover = false;
    function pointerMove(e: PointerEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      let pos = blob.center;
      let diff = { x: x - pos.x, y: y - pos.y };
      let dist = Math.sqrt(diff.x * diff.x + diff.y * diff.y);
      let angle: number | null = null;
      blob.mousePos = { x: pos.x - x, y: pos.y - y };
      if (dist < blob._radius && hover === false) {
        let vector = { x: x - pos.x, y: y - pos.y };
        angle = Math.atan2(vector.y, vector.x);
        hover = true;
      } else if (dist > blob._radius && hover === true) {
        let vector = { x: x - pos.x, y: y - pos.y };
        angle = Math.atan2(vector.y, vector.x);
        hover = false;
      }
      if (typeof angle === "number") {
        let nearestPoint: Point | null = null;
        let distanceFromPoint = 100;
        (blob.points as Point[]).forEach((point: Point) => {
          if (Math.abs(angle! - point.azimuth) < distanceFromPoint) {
            nearestPoint = point as Point;
            distanceFromPoint = Math.abs(angle! - point.azimuth);
          }
        });
        if (nearestPoint) {
          let strength = { x: oldMousePoint.x - x, y: oldMousePoint.y - y };
          let s = Math.sqrt(strength.x * strength.x + strength.y * strength.y) * 10;
          if (s > 100) s = 100;
          (nearestPoint as Point).acceleration = (s / 300) * (hover ? -1 : 1);
        }
      }
      oldMousePoint.x = x;
      oldMousePoint.y = y;
    }
    if (canvas) {
      canvas.addEventListener("pointermove", pointerMove);
    }
    // Responsive resize
    function handleResize() {
      const { w, h } = setCanvasSize();
      if (blob) {
        blob.cssWidth = w;
        blob.cssHeight = h;
        blob.setRadius(Math.min(w, h) / 2 - 10);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      if (canvas) {
        canvas.removeEventListener("pointermove", pointerMove);
      }
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line
  }, [imageSrc, width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "100%", height: "100%", ...style }}
      className={className}
    />
  );
}
