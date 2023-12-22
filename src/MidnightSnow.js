import React, { useEffect, useRef } from 'react';

import styled from 'styled-components';

const MidnightSnow = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const flakes = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const Flake = function () {
      this.draw = function () {
        this.g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.sz);
        this.g.addColorStop(0, 'hsla(255, 255%, 255%, 1)');
        this.g.addColorStop(1, 'hsla(255, 255%, 255%, 0)');
        ctx.moveTo(this.x, this.y);
        ctx.fillStyle = this.g;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2, true);
        ctx.fill();
      };
    };

    const Snowy = () => {
      let snow;
      const num = 200;
      const tsc = 1;
      const sp = 0.5;
      const sc = 1.3;
      const mv = 20;
      const min = 1;

      for (let i = 0; i < num; ++i) {
        snow = new Flake();
        snow.y = Math.random() * (window.innerHeight + 50);
        snow.x = Math.random() * window.innerWidth;
        snow.t = Math.random() * (Math.PI * 2);
        snow.sz = (100 / (10 + Math.random() * 100)) * sc;
        snow.sp = Math.pow(snow.sz * 0.8, 2) * 0.15 * sp;
        snow.sp = snow.sp < min ? min : snow.sp;
        flakes.current.push(snow);
      }

      go();

      function go() {
        window.requestAnimationFrame(go);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.fillStyle = 'hsla(242, 95%, 3%, 1)';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        for (let i = 0; i < flakes.current.length; ++i) {
          const f = flakes.current[i];
          f.t += 0.05;
          f.t = f.t >= Math.PI * 2 ? 0 : f.t;
          f.y += f.sp;
          f.x += Math.sin(f.t * tsc) * (f.sz * 0.3);
          if (f.y > window.innerHeight + 50) f.y = -10 - Math.random() * mv;
          if (f.x > window.innerWidth + mv) f.x = -mv;
          if (f.x < -mv) f.x = window.innerWidth + mv;
          f.draw();
        }
      }
    };

    Snowy();
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <Canvas ref={canvasRef}></Canvas>;
};

const Canvas = styled.canvas`
  /* @import url(https://fonts.googleapis.com/css?family=Molle:400italic&subset=latin,latin-ext);
  /* width: 100vw; */
  /* height: 100vh; */
  /* background-color: hsla(0, 0%, 0%, 1);
  margin: 0px;
  overflow: hidden;
  font-family: 'Molle', cursive;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 3em;
  color: hsla(255, 255%, 255%, 0.1); */
`;

export default MidnightSnow;
